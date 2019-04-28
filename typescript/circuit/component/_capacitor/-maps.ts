import makeMap from "../../generics/-makeMap";
import { CapacitorSchematic, CapacitorLayout } from "./~classes";
import makeSchematic from "./-makeSchematic";
import makeLayout from "./-makeLayout";
import loadSchematic from "./-loadSchematic";
import loadLayout from "./-loadLayout";


const schematicMap = {
   savename: "makeCapacitor",
   diagramType: "schematic" as const,
   instance: CapacitorSchematic,
   make: makeSchematic,
   load: loadSchematic,
}

const layoutMap = {
   savename: "makeLayoutCapacitor",
   diagramType: "layout" as const,
   instance: CapacitorLayout,
   make: makeLayout,
   load: loadLayout,
}

const maps = {
   schematic: makeMap(schematicMap, layoutMap),
   layout: makeMap(layoutMap, schematicMap)
}
export default maps;