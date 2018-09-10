namespace FileIO.Save {
   export function createFile(): string {
      let componentStrings: string[] = [];
      Circuit.manifest.layout.concat(Circuit.manifest.schematic).forEach(component => {
         try {
            let componentObject = {
               func: Circuit.mappings.getSaveName(component),
               properties: component.getProperties(),
               state: component.getState()
            }
            // Don't save disabled objects
            if (componentObject.state.disabled === false) {
               // Remove disabled field (no need to save it)
               delete componentObject.state.disabled;
               componentStrings.push(JSON.stringify(componentObject));
            }
         } catch (e) {
            console.error("Item %o cannot be saved (check mappings) with error %o", component, e);
         }

      });

      return JSON.stringify(componentStrings, undefined, 2);
   }
}