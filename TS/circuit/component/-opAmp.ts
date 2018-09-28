/// <reference path="_OpAmp/~classes.ts" />
/// <reference path="_OpAmp/-makeSchematic.ts" />
/// <reference path="_OpAmp/-loadSchematic.ts" />
/// <reference path="_OpAmp/-makeLayout.ts" />
/// <reference path="_OpAmp/-loadLayout.ts" />

namespace Circuit.Component {
   const schematicMap: Component.Types.map = {
      savename: "makeOpAmp",
      instance: _OpAmp.Classes.Schematic,
      make: _OpAmp.makeSchematic,
      load: _OpAmp.loadSchematic,
   }

   type layoutMap = Component.Types.map & {
      instance: typeof _OpAmp.Classes.Layout;
   }

   const layoutMap: layoutMap = {
      savename: "makeLayoutOpAmp",
      instance: _OpAmp.Classes.Layout,
      make: _OpAmp.makeLayout,
      load: _OpAmp.loadLayout,
   }

   schematicMap.correspondsTo = layoutMap;
   layoutMap.correspondsTo = schematicMap;

   export const opAmp = {
      schematic: schematicMap,
      layout: layoutMap
   }
}