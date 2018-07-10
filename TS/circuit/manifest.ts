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
         Active.layout.group.clear();
         Active.schematic.group.clear();
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
                  potentialMatchesConnectorSets = mergeConnectorsSets(potentialMatchesConnectorSets)
               }
               potentialMatchesConnectorSets.forEach(matchConnectorSet => {

                  connectorSetMatches += matchConnectorSet.filter(potentialMatchConnections => {
                     if (layComponent.name === "power") console.log("potentialMatchConnections", potentialMatchConnections)
                     return areConnectorsSame(connectorSet, potentialMatchConnections)
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

   const areComponentsSimilar = (componentA: Component.Instance, componentB: Component.Instance): boolean => {
      return (componentA.name === componentB.name &&
         arePropertiesEqual(componentA.getProperties(), componentB.getProperties()));
   };

   type connection = {
      name: string;
      component: Component.Instance;
   }


   type connector = {
      name: string;
      connections: connection[];
   }

   const arePropertiesEqual = (A: Component.Types.properties, B: Component.Types.properties) => {
      let Akeys = Object.keys(A);
      let Bkeys = Object.keys(B);

      return ((Akeys.length === Bkeys.length) &&
         Akeys.every(key => {
            return (B.hasOwnProperty(key) && (A as any)[key] === (B as any)[key]);
         })
      )
   }

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


   const mergeConnectorSets = (connectorSets: connector[][]): connector[][] => {
      let flatConnectors = Utility.flatten2d(connectorSets);
      let mergedConnectors: connector[] = [];
      while (flatConnectors.length) {
         flatConnectors = flatConnectors.filter((connector, idx) => {
            if (idx === 0 || (connector.name !== flatConnectors[0].name)) {
               return true;
            } else {
               flatConnectors[0].connections.push(...connector.connections)
               return false;
            }
         });
         mergedConnectors.push(flatConnectors[0])
         flatConnectors.shift();
      }
      return [mergedConnectors];
   }

   const mergeConnectorsSets = (connectorsSets: connector[][][]): connector[][][] => {
      let mergedSets: connector[][][] = [];
      connectorsSets.forEach(connectorSets => {
         connectorSets.forEach((connectorSet, i) => {
            mergedSets[i] = mergeConnectorSets((mergedSets[i] || []).concat(connectorSet))
         });
      });
      return mergedSets
   }

   const getMinConnections = (component: Component.Instance): connector[][] => {
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

   const areConnectionsSame = (connectionA: connection, connectionB: connection): boolean => {
      return (
         connectionA.name === connectionB.name
         && connectionA.component.name === connectionB.component.name
         && arePropertiesEqual(connectionA.component.getProperties(), connectionB.component.getProperties())
      );
   };

   const areConnectorConnectionsSame = (connectorA: connector, connectorB: connector): boolean => {
      let connectionsA = connectorA.connections;
      let connectionsB = connectorB.connections;
      if (connectorA.name !== connectorB.name) return false;
      let allAConnectionsAreSimilar = connectionsA.every(connectionA => {
         let match = connectionsB.find(connectionB => {
            return areConnectionsSame(connectionA, connectionB);
         });
         connectionsB = connectionsB.filter(connectorB => {
            return (connectorB !== match);
         });
         return (match !== undefined);
      });

      let allBConnectionsAreMapped = (connectionsB.length === 0);
      //console.log([connectorA], [connectorB], allAConnectionsAreSimilar, allBConnectionsAreMapped)
      return (allAConnectionsAreSimilar && allBConnectionsAreMapped)
   };

   const areConnectorsSame = (connectorsA: connector[], connectorsB: connector[]): boolean => {
      let allAConnectorsAreSimilar = connectorsA.every(connectorA => {
         let match = connectorsB.find(connectorB => {
            return areConnectorConnectionsSame(connectorA, connectorB);
         });
         connectorsB = connectorsB.filter(connectorB => {
            return (connectorB !== match);
         });
         return (match !== undefined);
      });

      let allBConnectorsAreMapped = (connectorsB.length === 0);
      //console.log([connectorsA], [connectorsB], allAConnectorsAreSimilar, allBConnectorsAreMapped)
      return (allAConnectorsAreSimilar && allBConnectorsAreMapped)
   }


}