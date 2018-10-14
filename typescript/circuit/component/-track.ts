/// <reference path="_Track/~classes.ts" />
/// <reference path="_Track/-makeLayout.ts" />
/// <reference path="_Track/-loadLayout.ts" />

namespace Circuit.Component {

   export const track = Component.makeMap({
      savename: "makeLayoutTrack",
      diagramType: "layout" as "layout",
      instance: _Track.Classes.Layout,
      make: _Track.makeLayout,
      load: _Track.loadLayout
   });
}