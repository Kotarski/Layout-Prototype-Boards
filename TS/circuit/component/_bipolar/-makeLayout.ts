/// <reference path="~classes.ts" />

namespace Circuit.Component._Bipolar {
   const defaulterLayout: ValueCheck.Defaulter<Types.values> = {
      joints: ValueCheck.joints<[Vector, Vector, Vector]>(
         [{ x: 0, y: 0 }, { x: 20, y: -20 }, { x: 40, y: 0 }]
      ),
      disabled: ValueCheck.validate("boolean", false),
      name: ValueCheck.validate("string", "bipolar"),
      currentGain: ValueCheck.validate("number", 0),
      type: ValueCheck.validate<"NPN" | "PNP">(["NPN", "PNP"], "NPN")
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