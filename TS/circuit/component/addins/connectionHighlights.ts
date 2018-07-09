namespace Circuit.Component.Addins.ConnectionHighlights {

   type colorPalette = string[];

   export const init = (component: Component.Instance, propogate: boolean = true, colorPalette: colorPalette = defaultColorPalette) => {
      let element = component.group.element;

      $(element).on("select", () => {
         clearConnectionsHighlights(component);
         createConnectionsHighlights(component, propogate, colorPalette);
      });
      $(element).on("dragSVG", () => {
         clearConnectionsHighlights(component);
         createConnectionsHighlights(component, propogate, colorPalette);
      });
      $(element).on("rotate", () => {
         clearConnectionsHighlights(component);
         createConnectionsHighlights(component, propogate, colorPalette);
      });
      $(element).on("deselect", () => {
         clearConnectionsHighlights(component);
      });
   }

   const createConnectorHighlights = (component: Component.Instance, connection: Component.Types.connector, color: string) => {
      let ctm = component.group.element.getCTM();
      let point = (ctm) ? connection.point.matrixTransform(ctm.inverse()) : connection.point;
      let highlight = new Svg.Elements.Graphics.Simples.Circle(
         { X: point.x, Y: point.y }, 4, "highlight highlightwithfill connectivityhighlight"
      );
      $(highlight.element).css({ "fill": color, "stroke": color })
      component.group.append(highlight);
   }

   const createConnectionsHighlights = (component: Component.Instance, propogate: boolean, colorPalette: colorPalette) => {
      let connectionSets = component.getConnections();
      connectionSets.forEach(connectionSet => {
         connectionSet.forEach((connectorConnections, i) => {
            let color = colorPalette[i % colorPalette.length];
            if (connectorConnections.length > 1 && propogate) {
               connectorConnections.slice(1).forEach(connector => {
                  createConnectorHighlights(component, connector, color)
               })
            } else {
               createConnectorHighlights(component, connectorConnections[0], color)
            }
         })
      })

   }


   const clearConnectionsHighlights = (component: Component.Instance) => {
      $(component.group.element).find(".connectivityhighlight").remove();
   }

   const defaultColorPalette: colorPalette = [
      "red",
      "green",
      "pink",
      "yellow",
      "cyan",
      "orange",
      "purple",
      "magenta"
   ]

}