/// <reference path="_Inductor/~classes.ts" />
/// <reference path="_Inductor/-makeSchematic.ts" />
/// <reference path="_Inductor/-loadSchematic.ts" />
/// <reference path="_Inductor/-makeLayout.ts" />
/// <reference path="_Inductor/-loadLayout.ts" />

namespace Circuit.Component {
   const schematicMap = {
      savename: "makeInductor",
      diagramType: "schematic" as "schematic",
      instance: _Inductor.Classes.Schematic,
      make: _Inductor.makeSchematic,
      load: _Inductor.loadSchematic,
   }

   const layoutMap = {
      savename: "makeLayoutInductor",
      diagramType: "layout" as "layout",
      instance: _Inductor.Classes.Layout,
      make: _Inductor.makeLayout,
      load: _Inductor.loadLayout,
   }

   export const inductor = {
      schematic: Component.makeMap(schematicMap, layoutMap),
      layout: Component.makeMap(layoutMap, schematicMap)
   }
}