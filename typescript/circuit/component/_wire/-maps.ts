import makeMap from "../../generics/-makeMap";
import { Schematic, Layout } from "./~classes";
import makeSchematic from "./-makeSchematic";
import makeLayout from "./-makeLayout";
import loadSchematic from "./-loadSchematic";
import loadLayout from "./-loadLayout";


const schematicMap = {
   savename: "makeWire",
   diagramType: "schematic" as "schematic",
   instance: Schematic,
   make: makeSchematic,
   load: loadSchematic
}

const layoutMap = {
   savename: "makeLayoutWire",
   diagramType: "layout" as "layout",
   instance: Layout,
   make: makeLayout,
   load: loadLayout
}

const maps = {
   schematic: makeMap(schematicMap),
   layout: makeMap(layoutMap)
}
export default maps;
