import makeMap from "../../generics/-makeMap";
import { PowerSchematic, PowerLayout } from "./~classes";
import makeSchematic from "./-makeSchematic";
import makeLayout from "./-makeLayout";
import loadSchematic from "./-loadSchematic";
import loadLayout from "./-loadLayout";


const schematicMap = {
   savename: "makePower",
   diagramType: "schematic" as "schematic",
   instance: PowerSchematic,
   make: makeSchematic,
   load: loadSchematic,
}

const layoutMap = {
   savename: "makeLayoutPower",
   diagramType: "layout" as "layout",
   instance: PowerLayout,
   make: makeLayout,
   load: loadLayout,
   isUnique: true
}

const maps = {
   schematic: makeMap(schematicMap, layoutMap),
   layout: makeMap(layoutMap, schematicMap)
}
export default maps;
