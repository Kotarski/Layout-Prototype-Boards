/// <reference path="_Stripboard/~classes.ts" />
/// <reference path="_Stripboard/-makeLayout.ts" />
/// <reference path="_Stripboard/-loadLayout.ts" />

namespace Circuit.Component {

   type layoutMap = Component.Types.map & {
      make: typeof _Stripboard.makeLayout;
   }

   const layoutMap: layoutMap = {
      savename: "makeLayoutStripboard",
      instance: _Stripboard.Classes.Layout,
      make: _Stripboard.makeLayout,
      load: _Stripboard.loadLayout,
   }

   export const stripboard = {
      layout: layoutMap,
   }
}