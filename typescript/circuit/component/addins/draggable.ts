import Component from "../../+component";
import vector, { Vector } from "../../../-vector";
// import mappings from "../../mappings";
import Events from "../../events";
import history from "../../history";
// import ControlValues from "../../../~controlValues";
//import * as $ from 'jquery';

type draggableComponent = Component & { joints: Vector[] };

const Draggable = (() => {
   const init = (component: draggableComponent, enablePredicate: ()=>boolean) => {
      const element = component.group.element;

      

      $(element).on(Events.dragStart, () => {
         history.add(component);
         component.insertInto(component.group.element);
      });

      $(element).on(Events.drag, (e, drag: Vector) => {
         if (e.target === element) {
            component.joints = vector(component.joints).sumWith(drag).vectors
            $(element).trigger(Events.draw);
         }
      });

      $(element).on(Events.dragStop, () => {
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