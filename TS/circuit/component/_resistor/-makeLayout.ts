/// <reference path="~classes.ts" />

namespace Circuit.Component._Resistor {
   const defaulterLayout: ValueCheck.Defaulter<Types.values> = {

   };

   export const makeLayout = getMaker(Classes.Layout, defaulterLayout,
      (component: Classes.Layout) => {

      }
   );
}