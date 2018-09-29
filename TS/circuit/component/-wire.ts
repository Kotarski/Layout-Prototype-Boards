/// <reference path="_Wire/~classes.ts" />
/// <reference path="_Wire/-makeSchematic.ts" />
/// <reference path="_Wire/-loadSchematic.ts" />
/// <reference path="_Wire/-makeLayout.ts" />
/// <reference path="_Wire/-loadLayout.ts" />

namespace Circuit.Component {
   const schematicMap: Component.Types.map = {
      savename: "makeWire",
      instance: _Wire.Classes.Schematic,
      make: _Wire.makeSchematic,
      load: _Wire.loadSchematic
   }

   //TODO Find a way to make typescript infer the correct type of makelayout
   type layoutMap = Component.Types.map & {
      make: typeof _Wire.makeLayout;
   }

   const layoutMap: layoutMap = {
      savename: "makeLayoutWire",
      instance: _Wire.Classes.Layout,
      make: _Wire.makeLayout,
      load: _Wire.loadLayout
   }

   export const wire = {
      schematic: schematicMap,
      layout: layoutMap
   }
}