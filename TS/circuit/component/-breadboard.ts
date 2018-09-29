/// <reference path="_Breadboard/~classes.ts" />
/// <reference path="_Breadboard/-makeSmall.ts" />
/// <reference path="_Breadboard/-loadSmall.ts" />
/// <reference path="_Breadboard/-makeLarge.ts" />
/// <reference path="_Breadboard/-loadLarge.ts" />

namespace Circuit.Component {
   const smallMap: Component.Types.map = {
      savename: "makeLayoutBreadboardSmall",
      instance: _Breadboard.Classes.Small,
      make: _Breadboard.makeSmall,
      load: _Breadboard.loadSmall,
   }

   const largeMap: Component.Types.map = {
      savename: "makeLayoutBreadboardLarge",
      instance: _Breadboard.Classes.Large,
      make: _Breadboard.makeLarge,
      load: _Breadboard.loadLarge,
   }


   export const Breadboard = {
      layoutSmall: smallMap,
      layoutLarge: largeMap
   }
}