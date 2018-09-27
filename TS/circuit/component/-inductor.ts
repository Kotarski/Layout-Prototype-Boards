/// <reference path="_Inductor/~classes.ts" />
/// <reference path="_Inductor/-makeSchematic.ts" />
/// <reference path="_Inductor/-loadSchematic.ts" />
/// <reference path="_Inductor/-makeLayout.ts" />
/// <reference path="_Inductor/-loadLayout.ts" />

namespace Circuit.Component {
   const schematicMap: Component.Types.map = {
      savename: "makeInductor",
      instance: _Inductor.Classes.Schematic,
      make: _Inductor.makeSchematic,
      load: _Inductor.loadSchematic,
   }

   const layoutMap: Component.Types.map = {
      savename: "makeLayoutInductor",
      instance: _Inductor.Classes.Layout,
      make: _Inductor.makeLayout,
      load: _Inductor.loadLayout,
   }

   schematicMap.correspondsTo = layoutMap;
   layoutMap.correspondsTo = schematicMap;

   export const inductor = {
      schematic: schematicMap,
      layout: layoutMap
   }
}