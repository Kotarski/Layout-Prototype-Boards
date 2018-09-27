/// <reference path="~classes.ts" />

namespace Circuit.Component._Inductor {
   const defaulterSchematic: ValueCheck.Defaulter<Types.values> = {

   };


   export const makeSchematic = getMaker(Classes.Schematic, defaulterSchematic,
      (component: Classes.Schematic) => {

      }
   );
}