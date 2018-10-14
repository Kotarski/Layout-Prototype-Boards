/// <reference path="_Resistor/~classes.ts" />
/// <reference path="_Resistor/-makeSchematic.ts" />
/// <reference path="_Resistor/-loadSchematic.ts" />
/// <reference path="_Resistor/-makeLayout.ts" />
/// <reference path="_Resistor/-loadLayout.ts" />

namespace Circuit.Component {
   const schematicMap = {
      savename: "makeResistor",
      diagramType: "schematic" as "schematic",
      instance: _Resistor.Classes.Schematic,
      make: _Resistor.makeSchematic,
      load: _Resistor.loadSchematic,
   }

   const layoutMap = {
      savename: "makeLayoutResistor",
      diagramType: "layout" as "layout",
      instance: _Resistor.Classes.Layout,
      make: _Resistor.makeLayout,
      load: _Resistor.loadLayout,
   }

   export const resistor = {
      schematic: Component.makeMap(schematicMap, layoutMap),
      layout: Component.makeMap(layoutMap, schematicMap)
   }
}