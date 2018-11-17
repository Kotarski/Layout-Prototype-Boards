import makeMap from "../../generics/-makeMap";
import { Large, Small } from "./~classes";
import makeSmall from "./-makeSmall";
import makeLarge from "./-makeLarge";
import loadSmall from "./-loadSmall";
import loadLarge from "./-loadLarge";

const smallMap = {
   savename: "makeLayoutBreadboardSmall",
   diagramType: "layout" as "layout",
   instance: Small,
   make: makeSmall,
   load: loadSmall,
   isBoard: true
}

const largeMap = {
   savename: "makeLayoutBreadboardLarge",
   diagramType: "layout" as "layout",
   instance: Large,
   make: makeLarge,
   load: loadLarge,
   isBoard: true
}


const maps = {
   layoutSmall: makeMap(smallMap),
   layoutLarge: makeMap(largeMap)
}
export default maps;