import Component from "../../+component";
import vector, { Vector } from "../../../-vector";
// import mappings from "../../mappings";
import Events from "../../events";
import history from "../../history";
// import ControlValues from "../../../~controlValues";
//import * as $ from 'jquery';

type draggableComponent = Component & { joints: Vector[] };

const Draggable = (() => {
   const init = (component: draggableComponent) => {
      const element = component.group.element

      $(element).on(Events.dragStart, () => {
         history.add(component);
         component.insertInto(component.group.element);
      });

      $(element).on(Events.drag, (e, drag: Vector) => {
         if (e.target === element) {
            // TODO: Cleanup mess once i've confirmed it still works...
            // component.joints.forEach(joint => {
            //    joint.x += drag.x;
            //    joint.y += drag.y;
            // })
            component.joints = component.joints.map(j=>vector(j, drag).sum().vector)
            $(element).trigger(Events.draw);
         }
      });

      $(element).on(Events.dragStop, () => {
         // component.joints.forEach(joint => {
         //    joint.x = Math.round(joint.x);
         //    joint.y = Math.round(joint.y);
         // });
         component.joints = component.joints.map(j=>vector(j).round().vector)
      });

      // // TODO, I don't quite like how this is coupled together
      // if (mappings.getComponentMapSafe(component).isBoard
      //    && !ControlValues.boardDraggingEnabled
      // ) {
      //    disable(component);
      // }
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