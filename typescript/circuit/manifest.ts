import Active from "../~active";
import Component, { Types as ComponentTypes } from "./+component";
import { Layout as OpAmp } from "./component/_opAmp/~classes"
import Curry from "../utility/~curry";
import split from "../utility/-split";
import is from "../utility/-is";
import isUnaryMap from "../utility/-isUnaryMap";
import mappings from "./mappings";
import history from "./history";
import Events from "./events";
import Diagram from "./+diagram";
import getComponentConnections from "./generics/-getComponentConnections";
//import * as $ from 'jquery';

const manifest = (() => {

   const clear = () => {
      manifest.layout = manifest.layout.filter(component => {
         component.group.element.remove();
         return false;
      });
      manifest.schematic = manifest.schematic.filter(component => {
         component.group.element.remove();
         return false;
      });
      $(Active.layout.root.element).children().remove();
      $(Active.schematic.root.element).children().remove();
   }

   let activeBoard: (Component | undefined);

   const constructFrom = (savedManifest: { schematic: any, layout: any }) => {
      manifest.clear();
      manifest.schematic = savedManifest.schematic;
      manifest.layout = savedManifest.layout;
      if (!savedManifest.layout || savedManifest.layout.length === 0) completeManifestLayout();

      manifest.activeBoard = manifest.layout.find(component => mappings.getComponentMapSafe(component).isBoard === true);
      draw();
   }

   const addComponent = (manifestSection: Component[], ...components: Component[]) => {
      let diagram: Diagram;

      if (manifestSection === manifest.schematic) {
         diagram = Active.schematic;
      } else {
         diagram = Active.layout;
      }

      components.forEach(component => component.disabled = true);

      history.add(manifest, ...components);

      components.forEach(component => {
         component.disabled = false;
         manifestSection.push(component);
         placeComponent(component, diagram);
      });
   }

   const placeComponent = (component: Component, diagram: Diagram) => {
      component.insertInto(diagram.root.group.element);
      $(component.group.element).trigger(Events.place);
   }

   const draw = () => {
      manifest.schematic.forEach(component => placeComponent(component, Active.schematic));
      manifest.layout.forEach(component => placeComponent(component, Active.layout));
   }

   const removeComponent = (...components: Component[]) => {
      history.add(manifest, ...components);
      manifest.layout = manifest.layout.filter(el => !components.includes(el));
      manifest.schematic = manifest.schematic.filter(el => !components.includes(el));

      components.forEach(component => {
         $(component.group.element).hide();
         component.disabled = true;
      });
   }

   const findCorresponding = (component: Component): Component[] => {
      if (!mappings.getComponentMapSafe(component).correspondsTo) return [];
      //Find component
      if (manifest.layout.includes(component)) {
         return manifest.schematic.filter(areComponentsSimilar(component));
      } else if (manifest.schematic.includes(component)) {
         return manifest.layout.filter(areComponentsSimilar(component))
      } else {
         return [];
      }
   }

   const checkAll = () => {
         /*LOGSTART*/console.groupCollapsed("Check Data");/*LOGEND*/
      // Only look at components which need to be compared
      let layComponents = manifest.layout.filter(c => mappings.getComponentMapSafe(c).correspondsTo);
      let schComponents = manifest.schematic.filter(c => mappings.getComponentMapSafe(c).correspondsTo);

      let schConnectorData = schComponents.map(schComponent => ({
         component: schComponent,
         connectorSets: getMinConnections(schComponent)
      }));

      

      // Split the layout components by whether they pass the test
      let passSorted = split(layComponents, (layComponent) => {
         if (schConnectorData.length === 0) return false;

         // Find the layout components connector sets
         let layConnectorSets = getMinConnections(layComponent);

         

         // Find the connector sets for schematic components that are similar
         let schConnectorMinData = schConnectorData.filter(datum =>
            areComponentsSimilar(layComponent)(datum.component)
         );

         console.log(schConnectorMinData,layComponent,layConnectorSets)

         // Merge them into one if the component is unique (e.g. power supplies)
         const componentIsUnique = mappings.getComponentMapSafe(layComponent).isUnique;
         if (componentIsUnique) {
            let merged = mergeConnectorsSets(schConnectorMinData.map(datum => datum.connectorSets))
            schConnectorMinData.forEach(datum => {
               datum.connectorSets = merged;
            });
         }

         let found = schConnectorMinData.filter(datum => connectorSetsHaveMatch(layConnectorSets, datum.connectorSets));

         if (componentIsUnique) {
            schConnectorData = schConnectorData.filter(datum => !found.includes(datum));
               /*LOGSTART*/console.log("Layout %s '%o, matched with '%o'", layComponent.name, [layComponent], found)/*LOGEND*/
         } else {
            schConnectorData = schConnectorData.filter(datum => datum !== found[0]);
               /*LOGSTART*/console.log("Layout %s '%o, matched with '%o'", layComponent.name, [layComponent], [found[0]])/*LOGEND*/
         }



         // Check if there is any match between connector sets
         return found.length > 0;
      });

      /*LOGSTART*/
      console.log("Unmatched schematic components: %o", schConnectorData.map(datum => datum.component));
      console.log("Unmatched layout components: %o", passSorted.fails);
      console.groupEnd();
      /*LOGEND*/

      return {
         corrects: passSorted.passes,
         incorrects: passSorted.fails
      }
   };

   const getState = () => {
      return {
         schematic: [...manifest.schematic],
         layout: [...manifest.layout],
         activeBoard: manifest.activeBoard
      }
   }

   return {
      schematic: [] as Component[],
      layout: [] as Component[],
      addComponent: addComponent,
      constructFrom: constructFrom,
      removeComponent: removeComponent,
      findCorresponding: findCorresponding,
      checkAll: checkAll,
      activeBoard: activeBoard,
      getState: getState,
      clear: clear
   }
})();

type connection = {
   name: string;
   component: Component;
}
type connector = {
   name: string;
   connections: connection[];
}
type connectorSet = connector[];
type connectorSetGroup = connectorSet[];
type connectorSetGroups = connectorSetGroup[];


const arePropertiesEqual = Curry.makeOptional(
   (A: ComponentTypes.properties, B: ComponentTypes.properties) => {
      let Akeys = Object.keys(A);
      let Bkeys = Object.keys(B);

      return ((Akeys.length === Bkeys.length) &&
         Akeys.every(key => {
            return (B.hasOwnProperty(key) && (A as any)[key] === (B as any)[key]);
         })
      )
   }
);

const areComponentsSimilar = Curry.makeOptional(
   (componentA: Component, componentB: Component): boolean => {
      return (
         componentA.name === componentB.name &&
         arePropertiesEqual(componentA.getProperties(), componentB.getProperties())
      );
   }
);

const createMissingLayoutElements = () => {
   let layoutCopy = manifest.layout.slice();
   manifest.schematic.forEach(schematicElement => {
      let properties = schematicElement.getProperties();
      let match = layoutCopy.find(layoutElement =>
         arePropertiesEqual(properties, layoutElement.getProperties())
      );
      if (match) {
         if (!mappings.getComponentMapSafe(match).isUnique) {
            layoutCopy = layoutCopy.filter(is(match));
         }
      } else {
         const correspondsTo = mappings.getComponentMapSafe(schematicElement).correspondsTo;
         if (correspondsTo !== undefined) {
            const newComponentMaker = correspondsTo.make as ComponentTypes.loadFunction;
            const newComponent = newComponentMaker(schematicElement.getProperties())
            //mappings.getLayoutInstanceFromSchematic(schematicElement);
            manifest.layout.push(newComponent);
            if (mappings.getComponentMapSafe(newComponent).isUnique) {
               layoutCopy.push(newComponent)
            }

         }
      }
   });
}

const mergeSingleOpAmps = () => {
   // For dual op amps
   let layoutOpAmps = manifest.layout.filter(layoutElement => (
      layoutElement["constructor"] === OpAmp
   )) as InstanceType<typeof OpAmp>[];

   let opAmpGroups: InstanceType<typeof OpAmp>[][] = [];
   layoutOpAmps.forEach((opAmp, i) => {
      let groupIdx = opAmpGroups.findIndex(group =>
         arePropertiesEqual(opAmp.getProperties(), group[0].getProperties())
      )
      if (groupIdx >= 0) {
         opAmpGroups[groupIdx].push(opAmp);
      } else {
         opAmpGroups.push([opAmp]);
      }
   });
   opAmpGroups.forEach(group => {
      while (group.length >= 2) {
         group[0].replaceWithDual()
         manifest.removeComponent(group[1]);
         group = group.splice(2);
      }
   });
}

// Add equivalent layout components for each schematic component
const completeManifestLayout = () => {
   createMissingLayoutElements();
   mergeSingleOpAmps();
}

const mergeConnectorSets = (connectorSets: connectorSetGroup): connectorSet => {
   // Reduce group to set
   return connectorSets.reduce((mergedConnectorSet, connectorSet) => {
      // Check each connector in set
      connectorSet.forEach(connector => {
         // If merged includes connector, merge, otherwise add 
         let found = mergedConnectorSet.find((mConnector) => mConnector.name === connector.name);
         if (found) {
            found.connections.push(...connector.connections)
         } else {
            mergedConnectorSet.push(connector);
         }
      });
      return mergedConnectorSet;
   });
}

const mergeConnectorsSets = (connectorSetGroups: connectorSetGroups): connectorSetGroup => {
   return connectorSetGroups.reduce((mergedConnectorSetGroup, connectorSetGroup) => {
      connectorSetGroup.forEach((connectorSet, i) => {
         mergedConnectorSetGroup[i] = mergeConnectorSets(
            [(mergedConnectorSetGroup[i] || []), connectorSet]
         );
      });
      return mergedConnectorSetGroup;
   });
}

const getMinConnections = (component: Component): connectorSetGroup => {
   return (getComponentConnections(component).map(connectorSet => {
      return (connectorSet.map(connections => {
         let connectorName = connections[0].name;
         connections.shift();
         let blackHole = connections.find(connection => mappings.getComponentMapSafe(connection.component).isUnique === true)
         if (blackHole) connections = connections.filter(is(blackHole));

         return {
            name: connectorName,
            connections: connections.filter((connection) =>
               mappings.getComponentMapSafe(connection.component).correspondsTo
            )
         }
      })).filter(c => c.connections.length !== 0);
   }));
}

const connectorSetsHaveMatch = Curry.makeOptional(
   (connectorSetsA: connectorSet[], connectorSetsB: connectorSet[]): boolean => {
      return connectorSetsA.some(connectorSetA => {
         return connectorSetsB.some(connectorSetMatch(connectorSetA));
      })
   }
);

const connectorSetMatch = Curry.makeOptional(
   (connectorSetA: connectorSet, connectorSetB: connectorSet): boolean => {
      // Returns true if both connector sets have the same set of connectors 
      // connected to the same set of connections...

      // Every connector in each connector set has a match in the corresponding set.
      return isUnaryMap(connectorSetA, connectorSetB, (connectorA, connectorB) => {
         if (connectorA.name !== connectorB.name) return false;
         const connectionsA = connectorA.connections;
         const connectionsB = connectorB.connections;
         // Every connection in each connector has a match in the corresponding connector
         return isUnaryMap(connectionsA, connectionsB, (connectionA, connectionB) => {
            // Connections are the same if:
            return (
               connectionA.name === connectionB.name
               && areComponentsSimilar(connectionA.component, connectionB.component)
            );
         })
      });
   }
);

export default manifest;