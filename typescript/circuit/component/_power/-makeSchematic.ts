/// <reference path="~classes.ts" />

namespace Circuit.Component._Power {
   const defaulterSchematic: ValueCheck.Defaulter<Types.values> = {
      name: ValueCheck.validate("string", "power"),
      disabled: ValueCheck.validate("boolean", false),
      joints: ValueCheck.joints<[Vector]>(
         [{ x: 0, y: 0 }]
      ),
      voltage: ValueCheck.validate("number", 0)
   };


   export const makeSchematic = getMaker(Classes.Schematic, defaulterSchematic,
      (component: Classes.Schematic) => {
         Addins.Selectable.init(component);
         Addins.ConnectionHighlights.init(component, false);
         Addins.Graphical.init(component);
         if (Constants.schematicManipulationEnabled) {
            Addins.Draggable.init(component);
         }
      }
   );
}