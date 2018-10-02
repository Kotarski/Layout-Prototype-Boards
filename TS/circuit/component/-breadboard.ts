/// <reference path="_Breadboard/~classes.ts" />
/// <reference path="_Breadboard/-makeSmall.ts" />
/// <reference path="_Breadboard/-loadSmall.ts" />
/// <reference path="_Breadboard/-makeLarge.ts" />
/// <reference path="_Breadboard/-loadLarge.ts" />

namespace Circuit.Component {
   const smallMap = {
      savename: "makeLayoutBreadboardSmall",
      diagramType: "layout" as "layout",
      instance: _Breadboard.Classes.Small,
      make: _Breadboard.makeSmall,
      load: _Breadboard.loadSmall,
      isBoard: true
   }

   const largeMap = {
      savename: "makeLayoutBreadboardLarge",
      diagramType: "layout" as "layout",
      instance: _Breadboard.Classes.Large,
      make: _Breadboard.makeLarge,
      load: _Breadboard.loadLarge,
      isBoard: true
   }


   export const Breadboard = {
      layoutSmall: Component.makeMap(smallMap),
      layoutLarge: Component.makeMap(largeMap)
   }
}