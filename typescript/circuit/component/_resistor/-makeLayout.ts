/// <reference path="~classes.ts" />

namespace Circuit.Component._Resistor {
   const defaulterLayout: ValueCheck.Defaulter<Types.values> = {
      name: ValueCheck.validate("string", "resistor"),
      disabled: ValueCheck.validate("boolean", false),
      joints: ValueCheck.joints<[Vector, Vector]>(
         [{ x: 0, y: 0 }, { x: 40, y: 40 }]
      ),
      resistance: ValueCheck.validate("number", 0)
   };

   export const makeLayout = getMaker(Classes.Layout, defaulterLayout,
      (component: Classes.Layout) => {
         Addins.Graphical.init(component);
         Addins.Draggable.init(component);
         Addins.Selectable.init(component);
         Addins.Extendable.init(component);
         Addins.ConnectionHighlights.init(component);
      }
   );
}