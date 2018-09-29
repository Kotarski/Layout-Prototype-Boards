/// <reference path="~classes.ts" />

namespace Circuit.Component._Wire {
   const defaulterLayout: ValueCheck.Defaulter<Types.valuesLayout> = {
      name: ValueCheck.validate("string", "wire"),
      disabled: ValueCheck.validate("boolean", false),
      joints: ValueCheck.joints(
         [{ x: 0, y: 0 }, { x: 80, y: 0 }], l => l >= 2
      ),
      color: ValueCheck.color("#545454")
   };

   export const makeLayout = getMaker(Classes.Layout, defaulterLayout,
      (component: Classes.Layout) => {
         Addins.Graphical.init(component); Addins.Draggable.init(component);
         Addins.Selectable.init(component);
         Addins.Extendable.init(component, true, true, true);
         Addins.ConnectionHighlights.init(component);
         Addins.Recolorable.init(component, () => getRecolorPosition(component));
      }
   );

   function getRecolorPosition(component: Classes.Layout): Vector {
      const angle = vector(component.joints[0]).getAngleTo(component.joints[1]);
      const offset = Utility.Polar.toVector(12, angle + 45);
      return vector(component.joints[0]).sumWith(offset).vector;
   }
}