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
         const filterFn = (other: Component.Instance) => areComponentsSimilar(component, other);
         if (manifest.layout.includes(component)) {
            return manifest.schematic.filter(filterFn);
         } else if (manifest.schematic.includes(component)) {
            return manifest.layout.filter(filterFn)
         } else {
            return [];
         }
      }

      const checkAll = () => {
         let schComponents = manifest.schematic.filter(component =>
            mappings.isCorresponder(component)
         );
         let layComponents = manifest.layout.filter(component =>
            mappings.isCorresponder(component)
         );

         console.log("CHECKING")
         let incorrects: Component.Instance[] = [];
         let corrects: Component.Instance[] = [];
         layComponents.forEach(layComponent => {
            let potentialMatches = schComponents.filter(schComponent => areComponentsSimilar(layComponent, schComponent));

            if (layComponent.name === "power") console.log("COMPONENT:", layComponent, potentialMatches)

            let componentMatches = 0;
            let layComponentConnectorSets = getMinConnections(layComponent);
            layComponentConnectorSets.forEach(connectorSet => {
               let connectorSetMatches = 0;

               let potentialMatchesConnectorSets = potentialMatches.map(match => {
                  return getMinConnections(match)
               });

               if (mappings.isUnique(layComponent)) {
                  potentialMatchesConnectorSets = [mergeConnectorsSets(potentialMatchesConnectorSets)];
               }
               potentialMatchesConnectorSets.forEach(matchConnectorSet => {

                  connectorSetMatches += matchConnectorSet.filter(potentialMatchConnections => {
                     if (layComponent.name === "power") console.log("potentialMatchConnections", potentialMatchConnections)
                     return areConnectorSetsSame(connectorSet, potentialMatchConnections)
                  }).length;

                  if (connectorSetMatches) {
                     if (layComponent.name === "power") console.log("Correct", matchConnectorSet)
                  } else {
                     if (layComponent.name === "power") console.log("Incorrect", matchConnectorSet)
                  }
               });


               if (connectorSetMatches > 0) componentMatches += 1;
            })

            if (componentMatches < 1) {
               incorrects.push(layComponent)
            } else {
               corrects.push(layComponent)
            }
         });


         return {
            corrects: corrects,
            incorrects: incorrects
         }
      }

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



   const arePropertiesEqual = (A: Component.Types.properties, B: Component.Types.properties) => {
      let Akeys = Object.keys(A);
      let Bkeys = Object.keys(B);

      return ((Akeys.length === Bkeys.length) &&
         Akeys.every(key => {
            return (B.hasOwnProperty(key) && (A as any)[key] === (B as any)[key]);
         })
      )
   }

   const areComponentsSimilar = (componentA: Component.Instance, componentB: Component.Instance): boolean => {
      return (componentA.name === componentB.name &&
         arePropertiesEqual(componentA.getProperties(), componentB.getProperties()));
   };


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
      let layoutOpAmps = manifest.layout.filter(layoutElement => layoutElement.name === "opAmp") as Component.OpAmpLayout.Instance[];
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

   const areConnectorSetsSame = (connectorSetA: connectorSet, connectorSetB: connectorSet): boolean => {
      // Returns true if both connector sets have the same set of connectors 
      // connected to the same set of connections...

      // Every connector in each connector set has a match in the corresponding set.
      return Utility.haveOneToOne(connectorSetA, connectorSetB, (connectorA, connectorB) => {
         if (connectorA.name !== connectorB.name) return false;
         const connectionsA = connectorA.connections;
         const connectionsB = connectorB.connections;
         // Every connection in each connector has a match in the corresponding connector
         return Utility.haveOneToOne(connectionsA, connectionsB, (connectionA, connectionB) => {
            // Connections are the same if:
            return (
               connectionA.name === connectionB.name
               && areComponentsSimilar(connectionA.component, connectionB.component)
            );
         })
      });
   }


}