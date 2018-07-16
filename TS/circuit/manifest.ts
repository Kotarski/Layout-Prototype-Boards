/// <reference path="../Utility/~curry.ts" />
namespace Circuit {


   export const manifest = (() => {

      const clear = () => {
         manifest.layout = manifest.layout.filter(component => {
            component.group.element.remove();
            return false;
         });
         manifest.schematic = manifest.schematic.filter(component => {
            component.group.element.remove();
            return false;
         });
         Active.layout.group.clearChildren();
         Active.schematic.group.clearChildren();
      }

      let activeBoard: (Component.Instance | undefined);

      const constructFrom = (savedManifest: { schematic: any, layout: any }) => {
         clear();
         manifest.schematic = savedManifest.schematic;
         manifest.layout = savedManifest.layout;
         if (!savedManifest.layout || savedManifest.layout.length === 0) completeManifestLayout();
         console.log(savedManifest, manifest)

         manifest.activeBoard = manifest.layout.find(component => mappings.isBoard(component));
         draw();
      }

      const addComponent = (components: (Component.Instance | Component.Instance[]), manifestSection: Component.Instance[]) => {
         let diagram: Circuit.Parts.Diagram;
         if (manifestSection === manifest.schematic) {
            diagram = Active.schematic;
         } else {
            diagram = Active.layout;
         }
         if (!(components instanceof Array)) components = [components];
         components.forEach(component => {
            manifestSection.push(component);
            placeComponent(component, diagram);
         });
      }

      const placeComponent = (component: Component.Instance, diagram: Parts.Diagram) => {
         component.insertInto(diagram.group);
         $(component.group.element).trigger(Events.place);
      }

      const draw = () => {
         manifest.schematic.forEach(component => placeComponent(component, Active.schematic));
         manifest.layout.forEach(component => placeComponent(component, Active.layout));
      }

      const removeComponent = (component: Component.Instance) => {
         manifest.layout = manifest.layout.filter(el => el !== component);
         manifest.schematic = manifest.schematic.filter(el => el !== component);
         if (component) component.group.element.remove();
      }

      const findCorresponding = (component: Component.Instance): Component.Instance[] => {
         if (!mappings.isCorresponder(component)) return [];
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
         // Only look at components which need to be compared
         let layComponents = manifest.layout.filter(mappings.isCorresponder);
         let schComponents = manifest.schematic.filter(mappings.isCorresponder);

         // Split the layout components by whether they pass the test
         let split = Utility.split(layComponents, (layComponent) => {
            // Find the layout components connector sets
            let layConnectorSets = getMinConnections(layComponent);

            // Find the connector sets for schematic components that are similar
            let schConnectorSets = schComponents
               .filter(areComponentsSimilar(layComponent)).map(getMinConnections);

            // Merge them into one if the component is unique (e.g. power supplies)
            if (mappings.isUnique(layComponent)) {
               schConnectorSets = [mergeConnectorsSets(schConnectorSets)];
            }

            // Check if there is any match between connector sets
            return schConnectorSets.some(connectorSetsHaveMatch(layConnectorSets));
         })

         return {
            corrects: split.passes,
            incorrects: split.fails
         }
      };

      return {
         schematic: [] as Component.Instance[],
         layout: [] as Component.Instance[],
         addComponent: addComponent,
         constructFrom: constructFrom,
         removeComponent: removeComponent,
         findCorresponding: findCorresponding,
         checkAll: checkAll,
         activeBoard: activeBoard
      }
   })();


   type connection = {
      name: string;
      component: Component.Instance;
   }
   type connector = {
      name: string;
      connections: connection[];
   }
   type connectorSet = connector[];
   type connectorSetGroup = connectorSet[];
   type connectorSetGroups = connectorSetGroup[];


   const arePropertiesEqual = Utility.Curry.makeOptional(
      (A: Component.Types.properties, B: Component.Types.properties) => {
         let Akeys = Object.keys(A);
         let Bkeys = Object.keys(B);

         return ((Akeys.length === Bkeys.length) &&
            Akeys.every(key => {
               return (B.hasOwnProperty(key) && (A as any)[key] === (B as any)[key]);
            })
         )
      }
   );

   const areComponentsSimilar = Utility.Curry.makeOptional(
      (componentA: Component.Instance, componentB: Component.Instance): boolean => {
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
            if (!mappings.isUnique(match)) {
               layoutCopy = layoutCopy.filter(layoutElement => layoutElement === match);
            }
         } else {
            if (mappings.isCorresponder(schematicElement)) {
               let newComponent = mappings.getLayoutInstanceFromSchematic(schematicElement);
               manifest.layout.push(newComponent);
               if (mappings.isUnique(newComponent)) {
                  layoutCopy.push(newComponent)
               }

            }
         }
      });
   }

   const mergeSingleOpAmps = () => {
      // For dual op amps
      let layoutOpAmps = manifest.layout.filter(layoutElement => {
         return (layoutElement["constructor"] === Component.OpAmpLayout.Instance)
      }) as Component.OpAmpLayout.Instance[];

      let opAmpGroups: Component.OpAmpLayout.Instance[][] = [];
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

   const getMinConnections = (component: Component.Instance): connectorSetGroup => {
      return (component.getConnections().map(connectorSet => {
         return connectorSet.map(connections => {
            let connectorName = connections[0].name;
            connections.shift();
            let blackHole = connections.find(connection => mappings.isUnique(connection.component))
            if (blackHole) connections = connections.filter(c => c === blackHole);

            return {
               name: connectorName,
               connections: connections.filter((connection) =>
                  mappings.isCorresponder(connection.component)
               )
            }
         })
      }));
   }

   const connectorSetsHaveMatch = Utility.Curry.makeOptional(
      (connectorSetsA: connectorSet[], connectorSetsB: connectorSet[]): boolean => {
         return connectorSetsA.some(connectorSetA => {
            return connectorSetsB.some(connectorSetMatch(connectorSetA));
         })
      }
   );

   const connectorSetMatch = Utility.Curry.makeOptional(
      (connectorSetA: connectorSet, connectorSetB: connectorSet): boolean => {
         // Returns true if both connector sets have the same set of connectors 
         // connected to the same set of connections...

         // Every connector in each connector set has a match in the corresponding set.
         return Utility.isUnaryMap(connectorSetA, connectorSetB, (connectorA, connectorB) => {
            if (connectorA.name !== connectorB.name) return false;
            const connectionsA = connectorA.connections;
            const connectionsB = connectorB.connections;
            // Every connection in each connector has a match in the corresponding connector
            return Utility.isUnaryMap(connectionsA, connectionsB, (connectionA, connectionB) => {
               // Connections are the same if:
               return (
                  connectionA.name === connectionB.name
                  && areComponentsSimilar(connectionA.component, connectionB.component)
               );
            })
         });
      }
   );


}