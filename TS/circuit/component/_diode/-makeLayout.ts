/// <reference path="~classes.ts" />

namespace Circuit.Component._Diode {
   const defaulterLayout: ValueCheck.Defaulter<Types.values> = {
      name: ValueCheck.validate("string", "diode"),
      disabled: ValueCheck.validate("boolean", false),
      joints: ValueCheck.joints<[Vector, Vector]>(
         [{ x: 0, y: 0 }, { x: 80, y: 0 }]
      ),
      breakdownVoltage: ValueCheck.validate("number", 0),
      saturationCurrent: ValueCheck.validate("number", 0),
      color: ValueCheck.color("N/A")
   };

   export const makeLayout = getMaker(Classes.Layout, defaulterLayout,
      (component: Classes.Layout) => {
         Addins.Graphical.init(component);
         Addins.Selectable.init(component);
         Addins.Draggable.init(component);
         Addins.Extendable.init(component);
         Addins.ConnectionHighlights.init(component);
      }
   );
}