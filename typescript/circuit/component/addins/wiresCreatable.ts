import Component, { Types as ComponentTypes } from "../../+component";
import vector, { Vector } from "../../../-vector";
import Events from "../../events";
import manifest from "../../manifest";
import wireMaps from "../_wire/-maps";
import { gridSpacing } from "../../../~constants";
import { Layout as WireLayout } from "../_wire/~classes";
//import * as $ from 'jquery';

type holeyComponent = Component & { getConnectors(): ComponentTypes.hole[][] };

const WiresCreatable = (() => {
   const init = (component: holeyComponent) => {
      const element = component.group.element;
      // Hole elements will not exist at initialisation,
      // need to use component filtered by .hole selector

      let wire: WireLayout; 

      const subtreeObserver = new MutationObserver((mutations) => {
         mutations.forEach(mutation => {
               $(mutation.addedNodes).filter(".hole").addClass("draggable")
         })
      })

      subtreeObserver.observe(element, { childList: true})
      
      $(element).on("DOMSubtreeModified", () => {
         $(element).find(".hole").addClass("draggable");
      })

      // TODO: Currently at the end of the drag the board ends up selected,
      // ideally the wire would end selected.
      $(element).on(Events.dragStart, ".hole", (e, start) => {
         wire = createWireAtPoint(vector(start).round(gridSpacing / 2).vector);
         const wireElement = wire.group.element;

         $(wireElement).trigger(Events.select);

         const dragHandle = $(wireElement).find(".dragHandle")[0] as SVGGraphicsElement;

         $(dragHandle).addClass("dragging");
         $(dragHandle).trigger(Events.dragStart, start);
         
         $(e.target).on(Events.drag, (e, drag) => {
            $(dragHandle).trigger(Events.drag, drag);
         })
   
         $(e.target).on(Events.dragStop, (e, stop) => {
            $(dragHandle).removeClass("dragging");
            $(dragHandle).trigger(Events.dragStop, stop);
            $(wireElement).trigger(Events.deselect);
         })

      })
   }

   const createWireAtPoint = (vector: Vector) => {
      const wire = wireMaps.layout.make({
         joints: [vector, vector],
      });
      manifest.addComponent(manifest.states.layout, wire);
      return wire;
   }

   return { init }
})()
export default WiresCreatable;