/// <reference path="_Resistor/~classes.ts" />
/// <reference path="_Resistor/-makeSchematic.ts" />
/// <reference path="_Resistor/-loadSchematic.ts" />
/// <reference path="_Resistor/-makeLayout.ts" />
/// <reference path="_Resistor/-loadLayout.ts" />

namespace Circuit.Component {
   const schematicMap: Component.Types.map = {
      savename: "makeResistor",
      instance: _Resistor.Classes.Schematic,
      make: _Resistor.makeSchematic,
      load: _Resistor.loadSchematic,
   }

   const layoutMap: Component.Types.map = {
      savename: "makeLayoutResistor",
      instance: _Resistor.Classes.Layout,
      make: _Resistor.makeLayout,
      load: _Resistor.loadLayout,
   }

   schematicMap.correspondsTo = layoutMap;
   layoutMap.correspondsTo = schematicMap;

   export const resistor = {
      schematic: schematicMap,
      layout: layoutMap
   }
}