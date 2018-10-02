namespace FileIO.Save {
   export function createFile(): string {
      let componentStrings: string[] = [];
      Circuit.manifest.layout.concat(Circuit.manifest.schematic).forEach(component => {
         try {
            const componentMap = Circuit.mappings.getComponentMap(component);
            if (componentMap === undefined) {
               console.error("No component map found!", component);
               throw new Error("Could not save component")
            }

            let componentObject = {
               func: Circuit.mappings.getComponentMap(component),
               ...component.getProperties(),
               ...component.getState()
            }
            // Don't save disabled objects
            if (componentObject.disabled === false) {
               // Remove disabled field (no need to save it)
               delete componentObject.disabled;
               componentStrings.push(JSON.stringify(componentObject));
            }
         } catch (e) {
            console.error("Item %o cannot be saved (check mappings) with error %o", component, e);
         }

      });

      return JSON.stringify(componentStrings, undefined, 2);
   }
}