/// <reference path="~classes.ts" />

namespace Circuit.Component._OpAmp {
   const defaulterLayout: ValueCheck.Defaulter<Types.valuesLayout> = {
      name: ValueCheck.validate("string", "opAmp"),
      disabled: ValueCheck.validate("boolean", false),
      isDual: ValueCheck.validate("boolean", false),
      joints: ValueCheck.joints<[Vector, Vector]>(
         [{ x: 30, y: 30 }, { x: 40, y: 30 }]
      ),
      offsetVoltage: ValueCheck.validate("number", 0)
   };

   export const makeLayout = getMaker(Classes.Layout, defaulterLayout,
      (component: Classes.Layout) => {
         Addins.Graphical.init(component);
         Addins.Draggable.init(component);
         Addins.Rotatable.init(component);
         Addins.Selectable.init(component);
         Addins.ConnectionHighlights.init(component);
      }
   );
}