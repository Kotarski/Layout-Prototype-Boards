import makeMap from "../../generics/-makeMap";
import { WireSchematic, WireLayout } from "./~classes";
import makeSchematic from "./-makeSchematic";
import makeLayout from "./-makeLayout";
import loadSchematic from "./-loadSchematic";
import loadLayout from "./-loadLayout";


const schematicMap = {
   savename: "makeWire",
   diagramType: "schematic" as const,
   instance: WireSchematic,
   make: makeSchematic,
   load: loadSchematic
}

const layoutMap = {
   savename: "makeLayoutWire",
   diagramType: "layout" as const,
   instance: WireLayout,
   make: makeLayout,
   load: loadLayout
}

const maps = {
   schematic: makeMap(schematicMap),
   layout: makeMap(layoutMap)
}
export default maps;
