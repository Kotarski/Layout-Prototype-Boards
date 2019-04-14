import Active from "../~active";
import Component, { Types as ComponentTypes, insert, getProperties } from "./+component";
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
      manifest.states.layout = manifest.states.layout.filter(component => {
         component.group.element.remove();
         return false;
      });
      manifest.states.schematic = manifest.states.schematic.filter(component => {
         component.group.element.remove();
         return false;
      });
      $(Active.layout.root.element).children().remove();
      $(Active.schematic.root.element).children().remove();
   }

   const constructFrom = (savedManifest: { schematic: any, layout: any }) => {
      manifest.clear();
      manifest.states.schematic = savedManifest.schematic;
      manifest.states.layout = savedManifest.layout;
      if (!savedManifest.layout || savedManifest.layout.length === 0) completeManifestLayout();

      manifest.states.activeBoard = manifest.states.layout.find(component => mappings.getComponentMapSafe(component).isBoard === true);
      draw();
   }

   const addComponent = (manifestSection: Component[], ...components: Component[]) => {
      let diagram: Diagram;

      if (manifestSection === manifest.states.schematic) {
         diagram = Active.schematic;
      } else {
         diagram = Active.layout;
      }

      components.forEach(component => component.flags.disabled = true);

      history.add(manifest, ...components);

      components.forEach(component => {
         component.flags.disabled = false;
         manifestSection.push(component);
         placeComponent(component, diagram);
      });
   }

   const placeComponent = (component: Component, diagram: Diagram) => {
      insert(component, diagram.root.group.element);
      $(component.group.element).trigger(Events.place);
   }

   const draw = () => {
      manifest.states.schematic.forEach(component => placeComponent(component, Active.schematic));
      manifest.states.layout.forEach(component => placeComponent(component, Active.layout));
   }

   const removeComponent = (...components: Component[]) => {
      history.add(manifest, ...components);
      manifest.states.layout = manifest.states.layout.filter(el => !components.includes(el));
      manifest.states.schematic = manifest.states.schematic.filter(el => !components.includes(el));

      components.forEach(component => {
         $(component.group.element).hide();
         component.flags.disabled = true;
      });
   }

   const findCorresponding = (component: Component): Component[] => {
      if (!mappings.getComponentMapSafe(component).correspondsTo) return [];
      //Find component
      if (manifest.states.layout.includes(component)) {
         return manifest.states.schematic.filter(areComponentsSimilar(component));
      } else if (manifest.states.schematic.includes(component)) {
         return manifest.states.layout.filter(areComponentsSimilar(component))
      } else {
         return [];
      }
   }

   const checkAll = () => {
         /*LOGSTART*/console.groupCollapsed("Check Data");/*LOGEND*/
      // Only look at components which need to be compared
      let layComponents = manifest.states.layout.filter(c => mappings.getComponentMapSafe(c).correspondsTo);
      let schComponents = manifest.states.schematic.filter(c => mappings.getComponentMapSafe(c).correspondsTo);

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
               /*LOGSTART*/console.log("Layout %s '%o, matched with '%o'", layComponent.type, [layComponent], found)/*LOGEND*/
         } else {
            schConnectorData = schConnectorData.filter(datum => datum !== found[0]);
               /*LOGSTART*/console.log("Layout %s '%o, matched with '%o'", layComponent.type, [layComponent], [found[0]])/*LOGEND*/
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

   
   const states: {
      schematic: Component[],
      layout: Component[],
      activeBoard?: Component,
      copy: () => typeof states
   } = {
      schematic: [],
      layout: [],
      copy: () => ({
         schematic: [...manifest.states.schematic],
         layout: [...manifest.states.layout],
         activeBoard: manifest.states.activeBoard,
         copy: manifest.states.copy
      })
   }

   const flags = {}

   return {
      // schematic: [] as Component[],
      // layout: [] as Component[],
      addComponent: addComponent,
      constructFrom: constructFrom,
      removeComponent: removeComponent,
      findCorresponding: findCorresponding,
      checkAll: checkAll,
      // activeBoard: activeBoard,
      states: states,
      flags: flags,
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
         componentA.type === componentB.type &&
         arePropertiesEqual(getProperties(componentA), getProperties(componentB))
      );
   }
);

const createMissingLayoutElements = () => {
   let layoutCopy = manifest.states.layout.slice();
   manifest.states.schematic.forEach(schematicElement => {
      let properties = getProperties(schematicElement);
      let match = layoutCopy.find(layoutElement =>
         arePropertiesEqual(properties, getProperties(layoutElement))
      );
      if (match) {
         if (!mappings.getComponentMapSafe(match).isUnique) {
            layoutCopy = layoutCopy.filter(is(match));
         }
      } else {
         const correspondsTo = mappings.getComponentMapSafe(schematicElement).correspondsTo;
         if (correspondsTo !== undefined) {
            const newComponentMaker = correspondsTo.make as ComponentTypes.loadFunction;
            const newComponent = newComponentMaker(getProperties(schematicElement))
            //mappings.getLayoutInstanceFromSchematic(schematicElement);
            manifest.states.layout.push(newComponent);
            if (mappings.getComponentMapSafe(newComponent).isUnique) {
               layoutCopy.push(newComponent)
            }

         }
      }
   });
}

const mergeSingleOpAmps = () => {
   // For dual op amps
   let layoutOpAmps = manifest.states.layout.filter(layoutElement => (
      layoutElement["constructor"] === OpAmp
   )) as InstanceType<typeof OpAmp>[];

   let opAmpGroups: InstanceType<typeof OpAmp>[][] = [];
   layoutOpAmps.forEach((opAmp, i) => {
      let groupIdx = opAmpGroups.findIndex(group =>
         arePropertiesEqual(getProperties(opAmp), getProperties(group[0]))
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