/// <reference path="~classes.ts" />

namespace Circuit.Component._Wire {
   const defaulterLayout: ValueCheck.Defaulter<Types.values> = {

   };

   export const makeLayout = getMaker(Classes.Layout, defaulterLayout,
      (component: Classes.Layout) => {

      }
   );
}