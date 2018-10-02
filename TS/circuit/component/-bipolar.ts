/// <reference path="_Bipolar/~classes.ts" />
/// <reference path="_Bipolar/-makeSchematic.ts" />
/// <reference path="_Bipolar/-loadSchematic.ts" />
/// <reference path="_Bipolar/-makeLayout.ts" />
/// <reference path="_Bipolar/-loadLayout.ts" />

namespace Circuit.Component {
   const schematicMap = {
      savename: "makeBipolar",
      diagramType: "schematic" as "schematic",
      instance: _Bipolar.Classes.Schematic,
      make: _Bipolar.makeSchematic,
      load: _Bipolar.loadSchematic,
   }

   const layoutMap = {
      savename: "makeLayoutBipolar",
      diagramType: "layout" as "layout",
      instance: _Bipolar.Classes.Layout,
      make: _Bipolar.makeLayout,
      load: _Bipolar.loadLayout,
   }

   export const bipolar = {
      schematic: Component.makeMap(schematicMap, layoutMap),
      layout: Component.makeMap(layoutMap, schematicMap)
   }
}