import makeMap from "../../generics/-makeMap";
import { ResistorSchematic, ResistorLayout } from "./~classes";
import makeSchematic from "./-makeSchematic";
import makeLayout from "./-makeLayout";
import loadSchematic from "./-loadSchematic";
import loadLayout from "./-loadLayout";


const schematicMap = {
   savename: "makeResistor",
   diagramType: "schematic" as "schematic",
   instance: ResistorSchematic,
   make: makeSchematic,
   load: loadSchematic,
}

const layoutMap = {
   savename: "makeLayoutResistor",
   diagramType: "layout" as "layout",
   instance: ResistorLayout,
   make: makeLayout,
   load: loadLayout,
}

const maps = {
   schematic: makeMap(schematicMap, layoutMap),
   layout: makeMap(layoutMap, schematicMap)
}
export default maps;