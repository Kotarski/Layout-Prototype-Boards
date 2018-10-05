/// <reference path="_Stripboard/~classes.ts" />
/// <reference path="_Stripboard/-makeLayout.ts" />
/// <reference path="_Stripboard/-loadLayout.ts" />

namespace Circuit.Component {

   const layoutMap = {
      savename: "makeLayoutStripboard",
      diagramType: "layout" as "layout",
      instance: _Stripboard.Classes.Layout,
      make: _Stripboard.makeLayout,
      load: _Stripboard.loadLayout,
      isBoard: true
   }

   export const stripboard = {
      layout: Component.makeMap(layoutMap),
   }
}