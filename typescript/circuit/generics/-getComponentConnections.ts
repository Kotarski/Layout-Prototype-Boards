
import Component, { Types } from "../+component";
import flatten from "../../utility/~flatten";
import mappings from "../mappings";
import vector from "../../-vector"

/** Returns an array of connected connectors for each connector in each connector set 
 * of the component
 */
export default function getComponentConnections(component: Component, otherComponents: Component[]): Types.connector[][][] {
   // Get all of the other connectors
   const allConnectors = flatten.flatten3d(otherComponents.map(el => el.connectorSets));
   // For each connector set ([])
   return component.connectorSets.map(connectorSet => {
      // Find the unique nets
      const uniqueNetConnectors = getUniqueNetConnectors(connectorSet);
      // For each unique net ([][])
      return uniqueNetConnectors.map(connector => {
         // Find all connectors on that net ([][][])
         return getConnectorConnections(connector, allConnectors)
      });
   });
}

/** Gets a single connector for each connector net */
function getUniqueNetConnectors(connectors: Types.connector[]): Types.connector[] {
   let nonCheckedConnectors = connectors;
   let uniqueNetConnectors: Types.connector[] = [];

   // While any connector is not checked
   while (nonCheckedConnectors.length) {
      // It must be on a new unique net, so add it
      uniqueNetConnectors.push(nonCheckedConnectors[0]);

      // Find all the others on that net
      let nettedConnectors = nonCheckedConnectors[0]
         .component.transferFunction(nonCheckedConnectors[0])
         .concat(nonCheckedConnectors[0]);

      // Remove them from the list to check
      nonCheckedConnectors = nonCheckedConnectors.filter(connector => !nettedConnectors.includes(connector));
   }

   return uniqueNetConnectors;
}

/** Returns an array of the connectors connected to a connector */
function getConnectorConnections(connector: Types.connector, allConnectors: Types.connector[]): Types.connector[] {

   let connectedConnectors: Types.connector[] = [];
   let nonCheckedConnections = connector.component.transferFunction(connector).concat(connector);

   // If any connection is unchecked
   while (nonCheckedConnections.length) {

      // Add it as a connector
      connectedConnectors.push(...nonCheckedConnections);

      // Find new connections from nonchecked
      let newConnections: Types.connector[] = [];
      nonCheckedConnections.forEach(connection => {
         // Find the direct connections, and add to connections
         getConnectorDirectConnections(connection, allConnectors).forEach(connected => {
            // Don't add if they already have been (prevents infinite loops!)
            if (!(connectedConnectors.includes(connected))) {
               connectedConnectors.push(connected);
               newConnections.push(...connected.component.transferFunction(connected));
            }
         })
      });

      // Start again with new set (each iteration we move one connector further down any nets)
      nonCheckedConnections = newConnections;
   }

   return connectedConnectors
}

/** Returns an array of the connectors which directly connect to a connector */
function getConnectorDirectConnections(connector: Types.connector, allConnectors: Types.connector[]): Types.connector[] {
   // Get the connectorTypes which it is ok to connect to
   const acceptedTypes = mappings.connectorAcceptedTypes[connector.type];
   // Get the location of the connector
   const point = connector.point;
   // Return other connectors that can be connected to
   return allConnectors.filter(other => {
      return (
         acceptedTypes.includes(other.type)
         && vector(point).isCloseTo(other.point)
      )
   });
}
