/// <reference path="~classes.ts" />

namespace Circuit.Component._Bipolar {
   const defaulterSchematic: ValueCheck.Defaulter<Types.values> = {
      name: ValueCheck.validate("string", "bipolar"),
      disabled: ValueCheck.validate("boolean", false),
      joints: ValueCheck.joints<[Vector, Vector, Vector]>(
         [{ x: -50, y: 0 }, { x: +10, y: -50 }, { x: +10, y: +50 }]
      ),
      currentGain: ValueCheck.validate("number", 0),
      type: ValueCheck.validate<"NPN" | "PNP">(["NPN", "PNP"], "NPN")
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