import makeMap from "../../generics/-makeMap";
import { StripboardLayout } from "./~classes";
import makeLayout from "./-makeLayout";
import loadLayout from "./-loadLayout";

const layoutMap = {
   savename: "makeLayoutStripboard",
   diagramType: "layout" as "layout",
   instance: StripboardLayout,
   make: makeLayout,
   load: loadLayout,
   isBoard: true
}

const maps = {
   layout: makeMap(layoutMap),
}
export default maps;