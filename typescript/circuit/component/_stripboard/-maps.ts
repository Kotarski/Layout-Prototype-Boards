import makeMap from "../../generics/-makeMap";
import { Layout } from "./~classes";
import makeLayout from "./-makeLayout";
import loadLayout from "./-loadLayout";

const layoutMap = {
   savename: "makeLayoutStripboard",
   diagramType: "layout" as "layout",
   instance: Layout,
   make: makeLayout,
   load: loadLayout,
   isBoard: true
}

const maps = {
   layout: makeMap(layoutMap),
}
export default maps;