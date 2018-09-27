/// <reference path="_Bipolar/~classes.ts" />
/// <reference path="_Bipolar/-makeSchematic.ts" />
/// <reference path="_Bipolar/-loadSchematic.ts" />
/// <reference path="_Bipolar/-makeLayout.ts" />
/// <reference path="_Bipolar/-loadLayout.ts" />

namespace Circuit.Component {
   const schematicMap: Component.Types.map = {
      savename: "makeBipolar",
      instance: _Bipolar.Classes.Schematic,
      make: _Bipolar.makeSchematic,
      load: _Bipolar.loadSchematic,
   }

   const layoutMap: Component.Types.map = {
      savename: "makeLayoutBipolar",
      instance: _Bipolar.Classes.Layout,
      make: _Bipolar.makeLayout,
      load: _Bipolar.loadLayout,
   }

   schematicMap.correspondsTo = layoutMap;
   layoutMap.correspondsTo = schematicMap;

   export const bipolar = {
      schematic: schematicMap,
      layout: layoutMap
   }
}