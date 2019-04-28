import makeMap from "../../generics/-makeMap";
import { BreadboardLarge, BreadboardSmall } from "./~classes";
import makeSmall from "./-makeSmall";
import makeLarge from "./-makeLarge";
import loadSmall from "./-loadSmall";
import loadLarge from "./-loadLarge";

const smallMap = {
   savename: "makeLayoutBreadboardSmall",
   diagramType: "layout" as const,
   instance: BreadboardSmall,
   make: makeSmall,
   load: loadSmall,
   isBoard: true
}

const largeMap = {
   savename: "makeLayoutBreadboardLarge",
   diagramType: "layout" as const,
   instance: BreadboardLarge,
   make: makeLarge,
   load: loadLarge,
   isBoard: true
}


const maps = {
   layoutSmall: makeMap(smallMap),
   layoutLarge: makeMap(largeMap)
}
export default maps;