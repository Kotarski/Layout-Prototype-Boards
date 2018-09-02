namespace Circuit.Component.Generics {
   export function makeConnector<T extends Types.connectorTypes>(
      component: Instance,
      name: string,
      type: T,
      position: Vector,
      symbol?: string
   ): Types.connector & { type: T } {

      let connector = {
         name: name,
         symbol: symbol,
         type: type,
         component: component,
         point: position,
      }

      return connector;
   }
}
