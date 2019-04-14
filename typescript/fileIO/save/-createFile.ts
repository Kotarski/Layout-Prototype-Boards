import manifest from "../../circuit/manifest";
import mappings from "../../circuit/mappings";
import { getProperties, getStates } from "../../circuit/+component";

function createFile(): string {
   let componentStrings: string[] = [];
   manifest.states.layout.concat(manifest.states.schematic).forEach(component => {
      try {
         const componentMap = mappings.getComponentMap(component);
         if (componentMap === undefined) {
               /*LOGSTART*/console.error("No component map found!", component);/*LOGEND*/
            throw new Error("Could not save component")
         }

         // Don't save disabled objects
         if (component.flags.disabled === false) {
            let componentObject = {
               func: mappings.getComponentMapSafe(component).savename,
               properties: getProperties(component),
               states: getStates(component)
            }
            componentStrings.push(JSON.stringify(componentObject));
         }
      } catch (e) {
            /*LOGSTART*/console.error("Item %o cannot be saved (check mappings) with error %o", component, e);/*LOGEND*/
      }

   });

   return JSON.stringify(componentStrings, undefined, 2);
}
export default createFile;