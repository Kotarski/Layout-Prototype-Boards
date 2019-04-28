import makeMap from "../../generics/-makeMap";
import { TrackLayout } from "./~classes";
import makeLayout from "./-makeLayout";
import loadLayout from "./-loadLayout";


const maps = makeMap({
   savename: "makeLayoutTrack",
   diagramType: "layout" as const,
   instance: TrackLayout,
   make: makeLayout,
   load: loadLayout
});
export default maps;