namespace Circuit.Component.Addins.Junctions {
   type nodeComponent = Component.Instance & {
      connectorSets: Component.Types.node[][],
   }

   export const init = (component: nodeComponent) => {
      let element = component.group;
      $(element.element).on(Events.moved + " " + Events.place, () => {
         clearJunctions(component);
         createJunctions(component);
      });
   }


   const createJunctions = (component: nodeComponent) => {
      let otherConnectors = Utility.flatten2d(manifest.schematic.map(component =>
         Utility.flatten2d(component.connectorSets).filter(connector =>
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
               Svg.Element.Circle.make(point, 5, "junction black")
            );
         }
      }));
   }

   const clearJunctions = (component: Component.Instance) => {
      $(component.group.element).find(".junction").remove();
   }
}