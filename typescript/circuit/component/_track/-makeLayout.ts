/// <reference path="~classes.ts" />

namespace Circuit.Component._Track {

   export const defaulter: ValueCheck.Defaulter<Types.values> = {
      name: ValueCheck.validate("string", "track"),
      style: ValueCheck.validate<"breadboard" | "stripboard">(["breadboard", "stripboard"], "breadboard"),
      disabled: ValueCheck.validate("boolean", false),
      joints: ValueCheck.joints<[Vector, Vector]>(
         [{ x: 0, y: 0 }, { x: 20, y: 0 }]
      ),
      holeSpacings: ValueCheck.validate(
         v => Array.isArray(v) && v.every(ValueCheck.test("number")), [0]
      ),
   };

   export const makeLayout = getMaker(Classes.Layout, defaulter,
      (component: Classes.Layout) => {
         Addins.Graphical.init(component);
         // Addins.Draggable.init(component);
         // Addins.Selectable.init(component);
         // Addins.Extendable.init(component);
         // Addins.ConnectionHighlights.init(component);
      }
   );
}