import Component, { Types as ComponentTypes } from "../../+component";
import vector, { Vector } from "../../../-vector";
import Events from "../../events";
import manifest from "../../manifest";
import wireMaps from "../_wire/-maps";
import { gridSpacing } from "../../../~constants";
import { Layout as WireLayout } from "../_wire/~classes";
//import * as $ from 'jquery';

type holeyComponent = Component & { connectorSets: ComponentTypes.hole[][] };

const WiresCreatable = (() => {
   const init = (component: holeyComponent) => {
      // Hole elements will not exist at initialisation,
      // need to use component filtered by .hole selector

      let wire: WireLayout; 
      $(component.group.element).on(Events.dragStart, ".hole", (e, start) => {
         wire = createWireAtPoint(vector(start).round(gridSpacing/2).vector);
         $(wire.group.element).trigger(Events.select);

         const dragHandle = $(wire.group.element).find(".dragHandle")[0] as SVGGraphicsElement;

         $(dragHandle).addClass("dragging");
         $(dragHandle).trigger(Events.dragStart, start);
         
         $(e.target).on(Events.drag, (e, drag) => {
            $(dragHandle).trigger(Events.drag, drag);
         })
   
         $(e.target).on(Events.dragStop, (e, stop) => {
            $(dragHandle).removeClass("dragging");
            $(dragHandle).trigger(Events.dragStop, stop);
         })
      })
   }

   const createWireAtPoint = (vector: Vector) => {
      const wire = wireMaps.layout.make({
         joints: [vector, vector],
      });
      manifest.addComponent(manifest.layout, wire);
      return wire;
   }

   return { init }
})()
export default WiresCreatable;