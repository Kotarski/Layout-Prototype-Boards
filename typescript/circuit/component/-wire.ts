/// <reference path="_Wire/~classes.ts" />
/// <reference path="_Wire/-makeSchematic.ts" />
/// <reference path="_Wire/-loadSchematic.ts" />
/// <reference path="_Wire/-makeLayout.ts" />
/// <reference path="_Wire/-loadLayout.ts" />

namespace Circuit.Component {
   const schematicMap = {
      savename: "makeWire",
      diagramType: "schematic" as "schematic",
      instance: _Wire.Classes.Schematic,
      make: _Wire.makeSchematic,
      load: _Wire.loadSchematic
   }

   const layoutMap = {
      savename: "makeLayoutWire",
      diagramType: "layout" as "layout",
      instance: _Wire.Classes.Layout,
      make: _Wire.makeLayout,
      load: _Wire.loadLayout
   }

   export const wire = {
      schematic: Component.makeMap(schematicMap),
      layout: Component.makeMap(layoutMap)
   }
}