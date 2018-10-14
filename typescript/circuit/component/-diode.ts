/// <reference path="_Diode/~classes.ts" />
/// <reference path="_Diode/-makeSchematic.ts" />
/// <reference path="_Diode/-loadSchematic.ts" />
/// <reference path="_Diode/-makeLayout.ts" />
/// <reference path="_Diode/-loadLayout.ts" />

namespace Circuit.Component {
   const schematicMap = {
      savename: "makeDiode",
      diagramType: "schematic" as "schematic",
      instance: _Diode.Classes.Schematic,
      make: _Diode.makeSchematic,
      load: _Diode.loadSchematic,
   }

   const layoutMap = {
      savename: "makeLayoutDiode",
      diagramType: "layout" as "layout",
      instance: _Diode.Classes.Layout,
      make: _Diode.makeLayout,
      load: _Diode.loadLayout,
   }

   export const diode = {
      schematic: Component.makeMap(schematicMap, layoutMap),
      layout: Component.makeMap(layoutMap, schematicMap)
   }
}