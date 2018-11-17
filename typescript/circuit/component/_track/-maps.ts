import makeMap from "../../generics/-makeMap";
import { Layout } from "./~classes";
import makeLayout from "./-makeLayout";
import loadLayout from "./-loadLayout";


const maps = makeMap({
   savename: "makeLayoutTrack",
   diagramType: "layout" as "layout",
   instance: Layout,
   make: makeLayout,
   load: loadLayout
});
export default maps;