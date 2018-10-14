/// <reference path="~classes.ts" />

namespace Circuit.Component._Breadboard {
   const defaulterSmall: ValueCheck.Defaulter<Types.values> = {
      name: ValueCheck.validate("string", "breadboardsmall"),
      disabled: ValueCheck.validate("boolean", false),
      joints: ValueCheck.joints<[Vector, Vector]>(
         [{ x: 0, y: 0 }, { x: 20, y: 0 }]
      ),
   };


   export const makeSmall = getMaker(Classes.Small, defaulterSmall,
      (component: Classes.Small) => {
         Addins.Graphical.init(component);
         Addins.Board.init(component);
         Addins.Selectable.init(component);
         Addins.WireCreation.init(component);
         Addins.Draggable.init(component);
         Addins.Rotatable.init(component);
      }
   );
}