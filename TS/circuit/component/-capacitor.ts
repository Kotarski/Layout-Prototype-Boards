/// <reference path="_capacitor/~classes.ts" />
/// <reference path="_capacitor/-makeSchematic.ts" />
/// <reference path="_capacitor/-loadSchematic.ts" />
/// <reference path="_capacitor/-makeLayout.ts" />
/// <reference path="_capacitor/-loadLayout.ts" />

namespace Circuit.Component {
   const schematicMap: Component.Types.map = {
      savename: "makeCapacitor",
      instance: _Capacitor.Classes.Schematic,
      make: _Capacitor.makeSchematic,
      load: _Capacitor.loadSchematic,
   }

   const layoutMap: Component.Types.map = {
      savename: "makeLayoutCapacitor",
      instance: _Capacitor.Classes.Layout,
      make: _Capacitor.makeLayout,
      load: _Capacitor.loadLayout,
   }

   schematicMap.correspondsTo = layoutMap;
   layoutMap.correspondsTo = schematicMap;

   export const capacitor = {
      schematic: schematicMap,
      layout: layoutMap
   }
}