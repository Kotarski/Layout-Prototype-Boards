import makeMap from "../../generics/-makeMap";
import { OpAmpSchematic, OpAmpLayout } from "./~classes";
import makeSchematic from "./-makeSchematic";
import makeLayout from "./-makeLayout";
import loadSchematic from "./-loadSchematic";
import loadLayout from "./-loadLayout";


const schematicMap = {
   savename: "makeOpAmp",
   diagramType: "schematic" as const,
   instance: OpAmpSchematic,
   make: makeSchematic,
   load: loadSchematic,
}

const layoutMap = {
   savename: "makeLayoutOpAmp",
   diagramType: "layout" as const,
   instance: OpAmpLayout,
   make: makeLayout,
   load: loadLayout,
}

const maps = {
   schematic: makeMap(schematicMap, layoutMap),
   layout: makeMap(layoutMap, schematicMap)
}
export default maps;