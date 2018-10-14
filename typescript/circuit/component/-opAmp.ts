/// <reference path="_OpAmp/~classes.ts" />
/// <reference path="_OpAmp/-makeSchematic.ts" />
/// <reference path="_OpAmp/-loadSchematic.ts" />
/// <reference path="_OpAmp/-makeLayout.ts" />
/// <reference path="_OpAmp/-loadLayout.ts" />

namespace Circuit.Component {
   const schematicMap = {
      savename: "makeOpAmp",
      diagramType: "schematic" as "schematic",
      instance: _OpAmp.Classes.Schematic,
      make: _OpAmp.makeSchematic,
      load: _OpAmp.loadSchematic,
   }

   const layoutMap = {
      savename: "makeLayoutOpAmp",
      diagramType: "layout" as "layout",
      instance: _OpAmp.Classes.Layout,
      make: _OpAmp.makeLayout,
      load: _OpAmp.loadLayout,
   }

   export const opAmp = {
      schematic: Component.makeMap(schematicMap, layoutMap),
      layout: Component.makeMap(layoutMap, schematicMap)
   }
}