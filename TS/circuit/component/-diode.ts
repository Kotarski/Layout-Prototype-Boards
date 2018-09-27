/// <reference path="_Diode/~classes.ts" />
/// <reference path="_Diode/-makeSchematic.ts" />
/// <reference path="_Diode/-loadSchematic.ts" />
/// <reference path="_Diode/-makeLayout.ts" />
/// <reference path="_Diode/-loadLayout.ts" />

namespace Circuit.Component {
   const schematicMap: Component.Types.map = {
      savename: "makeDiode",
      instance: _Diode.Classes.Schematic,
      make: _Diode.makeSchematic,
      load: _Diode.loadSchematic,
   }

   const layoutMap: Component.Types.map = {
      savename: "makeLayoutDiode",
      instance: _Diode.Classes.Layout,
      make: _Diode.makeLayout,
      load: _Diode.loadLayout,
   }

   schematicMap.correspondsTo = layoutMap;
   layoutMap.correspondsTo = schematicMap;

   export const diode = {
      schematic: schematicMap,
      layout: layoutMap
   }
}