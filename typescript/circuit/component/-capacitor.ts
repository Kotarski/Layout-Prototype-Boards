/// <reference path="_capacitor/~classes.ts" />
/// <reference path="_capacitor/-makeSchematic.ts" />
/// <reference path="_capacitor/-loadSchematic.ts" />
/// <reference path="_capacitor/-makeLayout.ts" />
/// <reference path="_capacitor/-loadLayout.ts" />

namespace Circuit.Component {
   const schematicMap = {
      savename: "makeCapacitor",
      diagramType: "schematic" as "schematic",
      instance: _Capacitor.Classes.Schematic,
      make: _Capacitor.makeSchematic,
      load: _Capacitor.loadSchematic,
   }

   const layoutMap = {
      savename: "makeLayoutCapacitor",
      diagramType: "layout" as "layout",
      instance: _Capacitor.Classes.Layout,
      make: _Capacitor.makeLayout,
      load: _Capacitor.loadLayout,
   }

   export const capacitor = {
      schematic: Component.makeMap(schematicMap, layoutMap),
      layout: Component.makeMap(layoutMap, schematicMap)
   }
}