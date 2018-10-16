import Component from "../../../circuit/+component";
import mappings from "../../../circuit/mappings";
type savedManifist = { schematic: Component[], layout: Component[] };

export default function buildComponents(rawComponents: any[]): savedManifist {
      /*LOGSTART*/console.groupCollapsed("Component Load Data");/*LOGEND*/

   let manifest: savedManifist = {
      schematic: [],
      layout: []
   }

   for (let rawComponent of rawComponents) {
      const componentMap = mappings.getComponentMap(rawComponent.func);

      if (componentMap === undefined) {
            /*LOGSTART*/console.error("I don't know how to build %o yet!", rawComponent);/*LOGEND*/
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
      /*LOGSTART*/console.groupEnd();/*LOGEND*/
   return manifest;
}