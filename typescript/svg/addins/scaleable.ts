import { Vector } from "../../-vector";
import svg from "../-svg";

namespace Scaleable {
   export const init = (element: SVGGraphicsElement, options: scalableOptions = {}): void => {
      // Set the event to occur on another target, but apply to yourself
      let eventTarget = options.eventTarget !== undefined ? options.eventTarget : element;

      // Scale occurs on mousewheel
      let mouseWheelHandler = (e: WheelEvent) => {
         // Prevent scaling if a drag is in progress
         // Grid size is calculated on dragstart and will get messed up
         if (e.buttons === 1 || e.buttons === 3) {
            return;
         }

         // Change scale by +/-0.05 on each step depending on wheel direction
         let scaleChange = Math.sign(e.deltaY) * -0.05;

         // Find the postion and size of the element on screen
         let clientBounds = element.getBoundingClientRect();

         // Find the position relative to the SVG position
         let owner = element.ownerSVGElement;
         let rootClientBounds = (owner) ? owner.getBoundingClientRect() : {
            left: 0,
            top: 0
         };
         let clientStart = {
            x: clientBounds.left - rootClientBounds.left,
            y: clientBounds.top - rootClientBounds.top
         };

         // Find the elements relative position in its own coordinate system
         let svgStart = svg(element).convertVector(clientStart, "DomToSvg", "absToDoc");
         let svgSize = svg(element).convertVector({
            x: clientBounds.width,
            y: clientBounds.height
         },
            "DomToSvg",
            "absToDoc"
         );

         // Find the position of the mouse relative to the centre of the element on screen
         let mousePosDomFromCentre: Vector = {
            x: e.clientX - (clientBounds.left + clientBounds.width / 2),
            y: e.clientY - (clientBounds.top + clientBounds.height / 2)
         };

         // Find the position of the mouse relative to the centre of the element in its own coordinate system
         let mousePosSvgFromCentre = svg(element).convertVector(
            mousePosDomFromCentre,
            "DomToSvg",
            "absToDoc"
         );

         // Perform the scale
         let scale = {
            x: 1 + scaleChange,
            y: 1 + scaleChange
         };
         svg(element).scale(scale, true);

         // Work out the translation required to keep the element under the mouse
         let scaleTranslationAdjust = {
            x: (svgStart.x + svgSize.x / 2 + mousePosSvgFromCentre.x) * -scaleChange,
            y: (svgStart.y + svgSize.y / 2 + mousePosSvgFromCentre.y) * -scaleChange
         };
         // Translate
         svg(element).translate(scaleTranslationAdjust, true);

         if (options.onScale !== undefined) {
            options.onScale(scale, scaleTranslationAdjust);
         }
      };

      // Add event listeners for mousewheel
      // Typescript definitions for addEventListener are incorrect (as any surpresses warning)
      eventTarget.addEventListener("DOMMouseScroll", (e) => mouseWheelHandler(e as WheelEvent), {
         passive: true
      }); // For Firefox
      eventTarget.addEventListener("mousewheel", (e) => mouseWheelHandler(e as WheelEvent), {
         passive: true
      }); // For everyone else
   }
}

interface scalableOptions {
   eventTarget?: SVGGElement;
   onScale?: (scale: Vector, translation: Vector) => void;
}

export default Scaleable;

