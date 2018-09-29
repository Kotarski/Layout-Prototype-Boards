/// <reference path="~classes.ts" />

namespace Circuit.Component._Breadboard {
   const defaulterLarge: ValueCheck.Defaulter<Types.values> = {
      name: ValueCheck.validate("string", "breadboardlarge"),
      disabled: ValueCheck.validate("boolean", false),
      joints: ValueCheck.joints<[Vector, Vector]>(
         [{ x: 0, y: 0 }, { x: 20, y: 0 }]
      ),
   };

   export const makeLarge = getMaker(Classes.Large, defaulterLarge,
      (component: Classes.Large) => {
         Addins.Graphical.init(component);
         Addins.Board.init(component);
         Addins.Selectable.init(component);
         Addins.WireCreation.init(component);
         Addins.Draggable.init(component);
      }
   );
}