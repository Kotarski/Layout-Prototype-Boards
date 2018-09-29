/// <reference path="_Power/~classes.ts" />
/// <reference path="_Power/-makeSchematic.ts" />
/// <reference path="_Power/-loadSchematic.ts" />
/// <reference path="_Power/-makeLayout.ts" />
/// <reference path="_Power/-loadLayout.ts" />

namespace Circuit.Component {

   //TODO Find a way to make typescript infer the correct type of makelayout
   type schematicMap = Component.Types.map & {
      make: typeof _Power.makeSchematic;
   }

   const schematicMap: schematicMap = {
      savename: "makePower",
      instance: _Power.Classes.Schematic,
      make: _Power.makeSchematic,
      load: _Power.loadSchematic,
   }

   const layoutMap: Component.Types.map = {
      savename: "makeLayoutPower",
      instance: _Power.Classes.Layout,
      make: _Power.makeLayout,
      load: _Power.loadLayout,
      isUnique: true
   }

   schematicMap.correspondsTo = layoutMap;
   layoutMap.correspondsTo = schematicMap;

   export const power = {
      schematic: schematicMap,
      layout: layoutMap
   }
}