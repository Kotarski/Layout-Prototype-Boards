namespace FileIO.Load.Dasim {
   type savedManifist = { schematic: Circuit.Component.Instance[], layout: Circuit.Component.Instance[] };

   export function buildComponents(rawComponents: any[]): savedManifist {
      console.groupCollapsed("Component Load Data");

      let manifest: savedManifist = {
         schematic: [],
         layout: []
      }

      for (let rawComponent of rawComponents) {
         const componentMap = Circuit.mappings.getComponentMap(rawComponent.func);

         if (componentMap === undefined) {
            console.error("I don't know how to build %o yet!", rawComponent);
            continue;
         }

         const sectionName = componentMap.diagramType;

         let manifestSection = (sectionName === "schematic") ? manifest.schematic : manifest.layout;

         let newComponents = componentMap.load(rawComponent);
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