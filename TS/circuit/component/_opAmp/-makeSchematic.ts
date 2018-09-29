/// <reference path="~classes.ts" />

namespace Circuit.Component._OpAmp {
   const defaulterSchematic: ValueCheck.Defaulter<Types.valuesSchematic> = {
      name: ValueCheck.validate("string", "opAmp"),
      disabled: ValueCheck.validate("boolean", false),
      joints: ValueCheck.joints<[Vector, Vector, Vector, Vector, Vector]>(
         [{ x: -30, y: -10 }, { x: -30, y: +10 }, { x: 40, y: 0 }, { x: 0, y: -20 }, { x: 0, y: 20 }]
      ),
      offsetVoltage: ValueCheck.validate("number", 0)
   };


   export const makeSchematic = getMaker(Classes.Schematic, defaulterSchematic,
      (component: Classes.Schematic) => {
         Addins.Selectable.init(component);
         Addins.ConnectionHighlights.init(component, false);
         Addins.Graphical.init(component);
         if (Constants.schematicManipulationEnabled) {
            Addins.Draggable.init(component);
            Addins.Extendable.init(component);
         }
      }
   );
}