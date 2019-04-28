import makeMap from "../../generics/-makeMap";
import { DiodeSchematic, DiodeLayout } from "./~classes";
import makeSchematic from "./-makeSchematic";
import makeLayout from "./-makeLayout";
import loadSchematic from "./-loadSchematic";
import loadLayout from "./-loadLayout";


const schematicMap = {
   savename: "makeDiode",
   diagramType: "schematic" as const,
   instance: DiodeSchematic,
   make: makeSchematic,
   load: loadSchematic,
}

const layoutMap = {
   savename: "makeLayoutDiode",
   diagramType: "layout" as const,
   instance: DiodeLayout,
   make: makeLayout,
   load: loadLayout,
}

const maps = {
   schematic: makeMap(schematicMap, layoutMap),
   layout: makeMap(layoutMap, schematicMap)
}
export default maps;