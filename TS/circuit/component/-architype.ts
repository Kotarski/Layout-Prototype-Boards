/// <reference path="_architype/~classes.ts" />
/// <reference path="_architype/-makeSchematic.ts" />
/// <reference path="_architype/-loadSchematic.ts" />
/// <reference path="_architype/-makeLayout.ts" />
/// <reference path="_architype/-loadLayout.ts" />

namespace Circuit.Component {
   const schematicMap: Component.Types.map = {
      savename: "makeArchitype",
      instance: _Architype.Classes.Schematic,
      make: _Architype.makeSchematic,
      load: _Architype.loadSchematic,
   }

   const layoutMap: Component.Types.map = {
      savename: "makeLayoutArchitype",
      instance: _Architype.Classes.Layout,
      make: _Architype.makeLayout,
      load: _Architype.loadLayout,
   }

   schematicMap.correspondsTo = layoutMap;
   layoutMap.correspondsTo = schematicMap;

   export const Architype = {
      schematic: schematicMap,
      layout: layoutMap
   }
}