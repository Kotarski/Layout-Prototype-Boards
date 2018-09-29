/// <reference path="~classes.ts" />

namespace Circuit.Component._Wire {
   const defaulterSchematic: ValueCheck.Defaulter<Types.valuesSchematic> = {
      name: ValueCheck.validate("string", "wire"),
      disabled: ValueCheck.validate("boolean", false),
      joints: ValueCheck.joints(
         [{ x: 0, y: 0 }, { x: 10, y: 10 }], l => l >= 2
      )
   };


   export const makeSchematic = getMaker(Classes.Schematic, defaulterSchematic,
      (component: Classes.Schematic) => {
         Addins.Junctions.init(component);
         Addins.Selectable.init(component);
         Addins.Graphical.init(component);
         if (Constants.schematicManipulationEnabled) {
            Addins.Draggable.init(component);
            Addins.Extendable.init(component, true, true);
         }
      }
   );
}