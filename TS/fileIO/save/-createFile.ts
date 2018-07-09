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
            componentStrings.push(JSON.stringify(componentObject));
         } catch (e) {
            console.error("Item %o cannot be saved (check mappings) with error %o", component, e);
         }

      });

      return JSON.stringify(componentStrings)
   }
}