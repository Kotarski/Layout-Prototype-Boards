import NodeElements from "../../../~nodeElements";
import Component from "../../+component";
import { Vector } from "../../../-vector";
import mappings from "../../mappings";
import Events from "../../events";
import history from "../../history";
import SvgDraggable from "../../../svg/addins/draggable"
//import * as $ from 'jquery';

type draggableComponent = Component & { joints: Vector[] };

const Draggable = (() => {
   const init = (component: draggableComponent) => {
      SvgDraggable.init(component.group.element, {
         disableMovement: true,
         onStart: () => {
            history.add(component);
            component.insertInto(component.group.element);
         },
         onDrag: (drag: Vector) => {
            // TODO IMMUTABLE
            component.joints.forEach(joint => {
               joint.x += drag.x;
               joint.y += drag.y;
            })
            $(component.group.element).trigger(Events.draw);
         },
         onStop: () => {
            component.joints.forEach(joint => {
               joint.x = Math.round(joint.x);
               joint.y = Math.round(joint.y);
            });
         }
      });

      // TODO, I don't quite like how this is coupled together
      if (mappings.getComponentMapSafe(component).isBoard &&
         NodeElements.boardDraggingEnabled.checked === false
      ) {
         disable(component);
      }
   }

   const disable = (component: Component) => {
      if ($(component.group.element).draggable("instance") !== undefined) {
         $(component.group.element).draggable("disable");
      }
   }

   const enable = (component: Component) => {
      if ($(component.group.element).draggable("instance") !== undefined) {
         $(component.group.element).draggable("enable");
      }
   }

   return { init, disable, enable }
})()
export default Draggable;