namespace FileIO.Load.Dasim {
   type savedManifist = { schematic: Circuit.Component.Instance[], layout: Circuit.Component.Instance[] };

   export function buildComponents(rawComponents: any[]): savedManifist {
      console.groupCollapsed("Component Load Data");

      let manifest: savedManifist = {
         schematic: [],
         layout: []
      }

      for (let rawComponent of rawComponents) {
         const sectionName = Circuit.mappings.sortComponentByName(rawComponent.func);
         if (sectionName === "none") {
            console.log("I don't know how to build %o yet!", rawComponent);
            continue;
         }

         let manifestSection = (sectionName === "schematic") ? manifest.schematic : manifest.layout;

         let componentLoadFunction = Circuit.mappings.getComponentLoader(rawComponent.func);

         let newComponents = componentLoadFunction(rawComponent);
         if (Array.isArray(newComponents)) {
            manifestSection.push(...newComponents);
         } else {
            manifestSection.push(newComponents);
         }

      }
      console.groupEnd();
      return manifest;
   }
}