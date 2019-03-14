import vector, { Vector } from "../../-vector";
import Events from "../../circuit/events";
import svg from "../-svg";
import { gridSpacing } from "../../~constants"
//import * as $ from 'jquery';
const Draggable = (() => {

   const init = (container: SVGGraphicsElement): void => {
      // Parameterise
      const dragStepThresholdSvg = gridSpacing / 2;
      const dragStartThresholdSvg = gridSpacing / 2;
      

      
      let state: "Idle" | "Ready" | "Dragging" = "Idle";
      let lastMousePosSvg: Vector;
      let element: SVGGraphicsElement;
      
      let onMouseDown = (e: JQuery.MouseDownEvent) => {
         // Possible states should be 'Idle'
         // Get the target element
         element = e.target;
         element = $(e.target).closest(":not(g.body,g.body *)").get(0);

         // Do drag prep
         const mouseDownDom = { x: e.clientX, y: e.clientY }
         lastMousePosSvg = svg(element).convertVector(mouseDownDom, "DomToSvg", "relToGroup");

         // Trigger drag prepped if I care
         $(document).on("mousemove", onMouseMove);
         $(document).one("mouseup", onMouseUp);
         state = "Ready"
      }

      const onMouseMove = (e: JQuery.MouseMoveEvent) => {
         // Possible states should 'Ready' or 'Dragging'
         // Get absolute position of mouse event
         const mouseMoveToDom = { x: e.clientX, y: e.clientY };
         const mousePosSvg = svg(element).convertVector(mouseMoveToDom, "DomToSvg", "relToGroup");
         

         if (state === "Ready") {
            if (!vector(mousePosSvg).isCloseTo(lastMousePosSvg, dragStartThresholdSvg / 2)) {
               // If new position > threshold from start
               $(element).addClass("dragging");
               $(element).trigger(Events.dragStart, lastMousePosSvg)
               state = "Dragging";
            } else {
               return;
            }
         }
         
         if (state === "Dragging") {
            if (!vector(mousePosSvg).isCloseTo(lastMousePosSvg, dragStepThresholdSvg / 2)) {
               const mouseMoveSvg = vector(mousePosSvg).subSum(lastMousePosSvg);
               const dragSteps = mouseMoveSvg.scaleWith(1 / dragStepThresholdSvg).round();
               const dragSizeSvg = dragSteps.scaleWith(dragStepThresholdSvg);
               $(element).trigger(Events.drag, dragSizeSvg.vector);
               lastMousePosSvg = dragSizeSvg.sumWith(lastMousePosSvg).vector;
            }
            
         }
      }

      const onMouseUp = (e: JQuery.MouseUpEvent) => {
         // Possible states should be 'Dragging' or 'Ready'     
         $(document).off("mousemove", onMouseMove);
         if (state === "Dragging") {
            $(element).removeClass("dragging");
            $(element).trigger(Events.dragStop, lastMousePosSvg);
         }
         state = "Idle"
      }

      $(container).on("mousedown", onMouseDown);
   }

   return { init }
})()


export default Draggable;

