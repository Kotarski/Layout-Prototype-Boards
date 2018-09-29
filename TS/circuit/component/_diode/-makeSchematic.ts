/// <reference path="~classes.ts" />

namespace Circuit.Component._Diode {
   const defaulterSchematic: ValueCheck.Defaulter<Types.values> = {
      name: ValueCheck.validate("string", "diode"),
      disabled: ValueCheck.validate("boolean", false),
      joints: ValueCheck.joints<[Vector, Vector]>(
         [{ x: 0, y: 0 }, { x: 40, y: 40 }]
      ),
      breakdownVoltage: ValueCheck.validate("number", 0),
      saturationCurrent: ValueCheck.validate("number", 0),
      color: ValueCheck.color("N/A")
   };


   export const makeSchematic = getMaker(Classes.Schematic, defaulterSchematic,
      (component: Classes.Schematic) => {
         Addins.Graphical.init(component);
         Addins.Selectable.init(component);
         Addins.ConnectionHighlights.init(component, false);
         if (Constants.schematicManipulationEnabled) {
            Addins.Draggable.init(component);
            Addins.Extendable.init(component);
         }
      }
   );
}