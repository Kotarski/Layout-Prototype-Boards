namespace Circuit.Component.Generics {
   export function makeConnector<T extends Types.connectorTypes>(
      component: Instance,
      name: string,
      type: T,
      position: Vector,
      symbol: string = ""
   ): Types.connector & { type: T } {

      let connector = {
         name: name,
         symbol: symbol,
         type: type,
         component: component,
         get point() {
            let ctm = connector.component.group.element.getCTM();
            return (ctm) ? Svg.makePoint(position).matrixTransform(ctm) : Svg.makePoint(position);
         }
      }

      return connector;
   }
}
