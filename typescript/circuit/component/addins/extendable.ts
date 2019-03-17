import Events from "../../events";
import Component from "../../+component";
import manifest from "../../manifest";
import history from "../../history";
import vector, { Vector } from "../../../-vector";
import { make as makeCircle } from "../../../svg/element/+circle";
import isNot from "../../../utility/-isNot";
import { Strict } from "../../../++types";
import { gridSpacing } from "../../../~constants";
//import * as $ from 'jquery';

type extendableComponent = Component & { joints: Vector[] };

const Extendable = (() => {
   type Options = {
      reticulatable?: boolean,
      removable?: boolean
   }
   const init = <T extends Strict<Options, T>>(
      component: extendableComponent, options?: T) => {

      let {
         reticulatable = false,
         removable = false
      } = { ...(options ? options : {}) }

      const element = component.group.element;


      $(element).on(Events.select, () => {
         createHandles(component);
      });
      $(element).on(Events.draw, () => {
         clearHandles(component);
         createHandles(component);
      });
      $(element).on(Events.dragStop, () => {
         clearHandles(component);
         createHandles(component);
      });
      $(element).on(Events.deselect, () => {
         clearHandles(component);
      });

      Stretchable.init(component);
      if (reticulatable) Reticulatable.init(component);
      if (removable) Removable.init(component);
   }

   const clearHandles = (component: extendableComponent) => {
      $(component.group.element)
         .children(".dragHandle")
         .remove(":not(.dragging)")
         .hide(0); // I.e. hide the dragging one...
   }

   const createHandles = (component: extendableComponent) => {
      component.joints.forEach(joint => {
         addHandle(component, joint)
      })
   };




   return { init }
})()

const Stretchable = (() => {
   const init = (component: extendableComponent) => {
      
   }
   return { init }
})()

const Reticulatable = (() => {
   const init = (component: extendableComponent) => {
      const element = component.group.element;

      // Add joint through dblclick
      $(element).dblclick(e => {
         if ($(e.target).closest(".handle").length < 1) {
            // Get position in svg coordinates, rounded to grid
            const position = vector(
               component.group.convertVector({ x: e.clientX || 0, y: e.clientY || 0 }, "DomToSvg", "relToGroup")
            ).round(gridSpacing/2).vector;

            // Get index for insertion into joint array
            const jointIdx = getJointInsertionIdx(component, position);

            //insert joint at position
            component.joints.splice(jointIdx, 0, position);
            addHandle(component, position);
            $(element).trigger(Events.draw, [e]);
         }
      });
   
      // Remove joint through drag
      $(element).on(Events.drag, ".dragHandle", (e) => {
         removeExcessJoints(component, $(e.target).data("point"));
         $(element).trigger(Events.draw, [e]);
      });

      // Remove joint through dblclick
      $(element).on("dblclick", ".dragHandle", (e) => {
         // If only two joints remain then they can't be removed by dblclick
         if (component.joints.length <= 2) return;
         
         const point = $(e.target).data("point");
         component.joints = component.joints.filter(isNot(point));
         e.target.remove();
         $(element).trigger(Events.draw, [e]);
      });
   }

   const removeExcessJoints = (component: extendableComponent, point: Vector) => {
      // If only two joints remain then they can't be removed during a drag
      if (component.joints.length <= 2) return;

      component.joints = component.joints.filter((joint) => {
         return (joint === point) || !vector(point).isCloseTo(joint)
      });

      $(component.group.element).children(".dragHandle").not(".dragging").filter((i, handle) => {
         return vector(point).isCloseTo($(handle).data('point'))
      }).remove();
   }

   const getJointInsertionIdx = (component: extendableComponent, point: Vector) => {
      let jointAngles = component.joints.map((j) =>
         Math.atan2(point.y - j.y, point.x - j.x) * 180 / Math.PI
      );

      let bestAnglePair = 180;
      let bestJointIdx = 0;

      for (let i = 1; i < jointAngles.length; i++) {
         let anglePair = Math.abs(Math.abs((jointAngles[i - 1] - jointAngles[i])) - 180)
         if (anglePair < bestAnglePair) {
            bestAnglePair = anglePair;
            bestJointIdx = i;
         }
      }

      return bestJointIdx;
   }
   return { init }
})()

const Removable = (() => {
   const init = (component: extendableComponent) => {
      const element = component.group.element;
      $(element).on(Events.dragStop, ".dragHandle", (e) => {
         if (component.joints.length === 2 && vector(component.joints[0]).isCloseTo(component.joints[1])) {
            manifest.removeComponent(component);
            history.mergeLast();
         }
      });
   }
   return { init }
})()

const addHandle = (component: extendableComponent, point: Vector) => {
   const handle = makeCircle(point, 5, "handle dragHandle draggable highlight").element;
   $(handle).data('point', point);
   component.group.append(handle);

   $(handle).on(Events.drag, (e, drag: Vector) => {
      point.x += drag.x;
      point.y += drag.y;
      $(component.group.element).trigger(Events.draw);
   });

   $(handle).on(Events.dragStop, () => {
      point.x = Math.round(point.x);
      point.y = Math.round(point.y);
   });
};

export default Extendable;