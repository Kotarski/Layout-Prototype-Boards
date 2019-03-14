import Component, { Types as ComponentTypes } from "../../+component";
import vector from "../../../-vector";
import Events from "../../events";
import manifest from "../../manifest";
import Flatten from "../../../utility/~flatten";
import { make as makeCircle } from "../../../svg/element/+circle";
//import * as $ from 'jquery';

type nodeComponent = Component & {
   connectorSets: ComponentTypes.node[][],
}

const Junctions = (() => {
   const init = (component: nodeComponent) => {
      let element = component.group;
      $(element.element).on(Events.anyDraw, () => {
         clearJunctions(component);
         createJunctions(component);
      });
   }

   const createJunctions = (component: nodeComponent) => {
      let otherConnectors = Flatten.flatten2d(manifest.schematic.map(component =>
         Flatten.flatten2d(component.connectorSets).filter(connector =>
            (connector.type === "node")
         )
      ));

      component.connectorSets.forEach(connectorSet => connectorSet.forEach(connector => {
         let point = connector.point;
         let attachedConnectors = otherConnectors.filter(other => {
            return vector(point).isCloseTo(other.point)
         });
         if (attachedConnectors.length === 3) {
            //let ctm = Active.schematic.root.group.element.getCTM();
            //point = (ctm) ? point.matrixTransform(ctm.inverse()) : point;
            component.group.prepend(
               makeCircle(point, 5, "junction black")
            );
         }
      }));
   }

   const clearJunctions = (component: Component) => {
      $(component.group.element).find(".junction").remove();
   }

   return { init }
})()
export default Junctions;