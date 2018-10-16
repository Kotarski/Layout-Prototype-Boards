import Component, { Types as ComponentTypes } from "../../+component";
import Events from "../../events";
import { make as makeCircle } from "../../../svg/element/+circle";
import { make as makeText } from "../../../svg/element/+text";
//import * as $ from 'jquery';
namespace ConnectionHighlights {

   type colorPalette = string[];

   export const init = (component: Component, propogate: boolean = true, colorPalette: colorPalette = defaultColorPalette) => {
      let element = component.group.element;

      $(element).on(Events.select, () => {
         createConnectionsHighlights(component, propogate, colorPalette);
      });
      $(element).on(Events.draw, () => {
         clearConnectionsHighlights(component);
         if ($(component.group.element).hasClass("selected")) {
            createConnectionsHighlights(component, propogate, colorPalette);
         }
      });
      $(element).on(Events.deselect, () => {
         clearConnectionsHighlights(component);
      });

   }

   const createConnectorHighlights = (component: Component, connection: ComponentTypes.connector, color: string) => {
      let highlight = makeCircle(connection.point, 4, "highlight highlightwithfill connectivityhighlight");

      $(highlight.element).css({ "fill": color, "stroke": color })
      component.group.append(highlight);

      if (connection.symbol !== undefined) {
         let symbol = makeText(connection.symbol, connection.point, "text connectivityhighlight");
         component.group.append(symbol);
      }
   }

   const createConnectionsHighlights = (component: Component, propogate: boolean, colorPalette: colorPalette) => {
      let connectionSets = component.getConnections();
      connectionSets.forEach(connectionSet => {
         connectionSet.forEach((connectorConnections, i) => {
            let color = colorPalette[i % colorPalette.length];
            if (connectorConnections.length > 1 && propogate) {
               connectorConnections.slice(1).forEach(connector => {
                  createConnectorHighlights(component, connector, color)
               })
            }
            createConnectorHighlights(component, connectorConnections[0], color);
         })
      })

   }


   const clearConnectionsHighlights = (component: Component) => {
      $(component.group.element).find(".connectivityhighlight").remove();
   }

   const defaultColorPalette: colorPalette = [
      "red",
      "#8bc34a",
      "pink",
      "yellow",
      "cyan",
      "orange",
      "purple",
      "magenta"
   ]

}
export default ConnectionHighlights