/// <reference path="_Power/~classes.ts" />
/// <reference path="_Power/-makeSchematic.ts" />
/// <reference path="_Power/-loadSchematic.ts" />
/// <reference path="_Power/-makeLayout.ts" />
/// <reference path="_Power/-loadLayout.ts" />

namespace Circuit.Component {

   const schematicMap = {
      savename: "makePower",
      diagramType: "schematic" as "schematic",
      instance: _Power.Classes.Schematic,
      make: _Power.makeSchematic,
      load: _Power.loadSchematic,
   }

   const layoutMap = {
      savename: "makeLayoutPower",
      diagramType: "layout" as "layout",
      instance: _Power.Classes.Layout,
      make: _Power.makeLayout,
      load: _Power.loadLayout,
      isUnique: true
   }

   export const power = {
      schematic: Component.makeMap(schematicMap, layoutMap),
      layout: Component.makeMap(layoutMap, schematicMap)
   }
}