import Events from "../../events";
import Component from "../../+component";
import manifest from "../../manifest";
import history from "../../history";
import vector, { Vector } from "../../../-vector";
import { make as makeCircle } from "../../../svg/element/+circle";
import SvgDraggable from "../../../svg/addins/draggable";
//import * as $ from 'jquery';

namespace Extendable {
   type extendableComponent = Component & { joints: Vector[] };
   export const init = (
      component: extendableComponent,
      canAddJoints: boolean = false,
      canRemoveJoints: boolean = false,
      canRemoveComponent: boolean = false) => {


      let element = component.group.element;

      $(element).on(Events.select, () => {
         createHandles(component);
      });
      $(element).on(Events.draw, (e, eOrigin) => {
         if (!(eOrigin !== undefined && $(eOrigin.target).hasClass("dragHandle"))) {
            clearHandles(component);
            createHandles(component);
         }
      });
      $(element).on(Events.dragStop, () => {
         clearHandles(component);
         createHandles(component);
      });
      $(element).on(Events.deselect, () => {
         clearHandles(component);
      });

      if (canAddJoints) initHandleInsertion(component);
      if (canRemoveJoints) initJointRemoval(component);
      if (canRemoveComponent) initComponentRemoval(component);
   }


   const createHandles = (component: extendableComponent) => {
      initHandles(component);
   }


   const clearHandles = (component: extendableComponent) => {
      $(component.group.element).find(".dragHandle").remove();
   }

   const initHandles = (component: extendableComponent) => {
      component.joints.forEach((joint, index) => {
         addHandle(component, joint, index)
      })
   };

   const initHandleInsertion = (component: extendableComponent) => {
      $(component.group.element).dblclick((e) => {
         if ($(e.target).closest(".handle").length < 1) {

            // Get mouse coordinates 
            const clientX = e.clientX;
            const clientY = e.clientY;
            if (!(clientX && clientY)) {
               throw new Error("Mouse event did not provide coordinates!");
            }
            const clientPos = { x: clientX, y: clientY };

            // Get position in svg coordinates, rounded to grid
            const svgPos = vector(component.group.convertVector(clientPos, "DomToSvg", "relToGroup"))
               .snapToGrid().vector;

            // Get index for insertion into joint array
            const jointIdx = getJointInsertionIdx(component, svgPos);

            //insert joint at position
            component.joints.splice(jointIdx, 0, svgPos);
            addHandle(component, svgPos, jointIdx);
            $(component.group.element).trigger(Events.draw, [e]);
         }
      });
   };

   const initJointRemoval = (component: extendableComponent) => {


      $(component.group.element).on(Events.drag, ".dragHandle", (e) => {
         removeExcessJoints(component, e.target);
         $(component.group.element).trigger(Events.draw, [e]);
      });

      $(component.group.element).on("dblclick", ".dragHandle", (e) => {
         if (component.joints.length > 2) {

            const jointIdx = $(e.target).data("jointIndex") as number;
            component.joints = component.joints.filter((v, i) => i !== jointIdx);
            e.target.remove();
            $(component.group.element).trigger(Events.draw, [e]);
         }
      });


   }

   const initComponentRemoval = (component: extendableComponent) => {
      $(component.group.element).on(Events.dragStop, ".dragHandle", (e) => {
         if (component.joints.length === 2 && vector(component.joints[0]).isCloseTo(component.joints[1])) {
            manifest.removeComponent(component);
            history.mergeLast();
         }
      });
   };

   const addHandle = (component: extendableComponent, point: Vector, index: number) => {
      let dragHandle = makeCircle(point, 5, "handle dragHandle highlight highlightwithfill");

      $(dragHandle.element).data('jointIndex', index);

      component.group.append(dragHandle);

      SvgDraggable.init(dragHandle.element);

      $(dragHandle.element).on(Events.drag, (e, ui, drag: Vector) => {
         let index = $(dragHandle.element).data('jointIndex');

         console.log(index)

         const joints = [...component.joints];

         if (joints.length <= index) {
            index = joints.length - 1;
         }

         const modifiedJoint = vector(joints[index]).sumWith(drag).vector;
         joints.splice(index, 1, modifiedJoint);

         component.joints = joints;

         $(dragHandle.element).data('jointIndex', index)
         $(component.group.element).trigger(Events.draw, [e]);
      });


      $(dragHandle.element).on(Events.dragStop, () => {
         component.joints = vector(component.joints).snapToGrid().vectors;
      });

      return dragHandle;
   };

   const removeExcessJoints = (component: extendableComponent, from: Element) => {
      const joints = [...component.joints];
      let fromIdx = $(from).data('jointIndex') as number;

      if (joints.length > 2) {

         component.joints = joints.filter((joint, jointIdx) => {

            if ((fromIdx !== jointIdx) && vector(joints[fromIdx]).isCloseTo(joint)) {

               $(component.group.element)
                  .children(".dragHandle")
                  .filter((n, el) => $(el).data('jointIndex') === jointIdx)
                  .remove();

               $(from).data('jointIndex', Math.min(fromIdx, jointIdx))

               return false;
            }

            return true;
         });
      };


   }

   const getJointInsertionIdx = (component: extendableComponent, point: Vector) => {
      //handles: (Parts.Pins.MovePin)[],
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
}
export default Extendable;