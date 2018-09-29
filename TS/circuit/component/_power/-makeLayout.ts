/// <reference path="~classes.ts" />

namespace Circuit.Component._Power {
   const defaulterLayout: ValueCheck.Defaulter<Types.values> = {
      name: ValueCheck.validate("string", "power"),
      disabled: ValueCheck.validate("boolean", false),
      joints: ValueCheck.joints<[Vector]>(
         [{ x: 0, y: 40 }]
      ),
      voltage: ValueCheck.validate("number", 0)
   };

   export const makeLayout = getMaker(Classes.Layout, defaulterLayout,
      (component: Classes.Layout) => {
         Addins.Graphical.init(component);
         Addins.Draggable.init(component);
         Addins.Selectable.init(component);
         Addins.ConnectionHighlights.init(component, true, getHighlightColor(component));
         Addins.WireCreation.init(component);
      }
   );

   function getHighlightColor(component: Classes.Layout): string[] {
      return [(component.voltage < 0)
         ? "blue" // negative
         : (component.voltage > 0)
            ? "red" // positive
            : "black" // zero (ground);
      ]
   }
}