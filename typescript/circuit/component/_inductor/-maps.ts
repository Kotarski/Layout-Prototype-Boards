import makeMap from "../../generics/-makeMap";
import { InductorSchematic, InductorLayout } from "./~classes";
import makeSchematic from "./-makeSchematic";
import makeLayout from "./-makeLayout";
import loadSchematic from "./-loadSchematic";
import loadLayout from "./-loadLayout";


const schematicMap = {
   savename: "makeInductor",
   diagramType: "schematic" as const,
   instance: InductorSchematic,
   make: makeSchematic,
   load: loadSchematic,
}

const layoutMap = {
   savename: "makeLayoutInductor",
   diagramType: "layout" as const,
   instance: InductorLayout,
   make: makeLayout,
   load: loadLayout,
}

const maps = {
   schematic: makeMap(schematicMap, layoutMap),
   layout: makeMap(layoutMap, schematicMap)
}
export default maps;