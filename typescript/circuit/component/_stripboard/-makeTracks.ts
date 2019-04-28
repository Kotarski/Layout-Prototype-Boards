import { StripboardLayout as Stripboard } from "./~classes";
import { TrackLayout as Track, TrackLayout } from "../_track/~classes";
import TrackMap from "../_track/-maps";
import vector from "../../../-vector";

import { gridSpacing } from "../../../~constants";

export default function makeTracks(parent: Stripboard): Track[] {
   const rotation = vector(parent.states.joints[0]).getAngleTo(parent.states.joints[1]);

   const start = vector({ x: parent.properties.columns -1, y: parent.properties.rows -1 })
      .scaleWith(-gridSpacing / 2)
      .rotate(rotation)
      .sumWith(parent.states.joints[0])

   const step = vector({ x: gridSpacing, y: 0 }).rotate(rotation);

   const tracks = [...Array(parent.properties.rows).keys()].map((row) => {
      // The position of the start of the row (the first hole)
      const rowStart = vector({ x: 0, y: row * gridSpacing })
         .rotate(rotation)
         .sumWith(start).vector;

      // The offset between each hole and the next in gridSpacings
      const holeSpacings: number[] = [0, ...Array(parent.properties.columns - 1).fill(1)];

      const breaks = parent.states.trackBreaks.filter(b => b.track === row).map(b => b.hole);

      return TrackMap.make({
         holeSpacings: holeSpacings,
         style: "stripboard",
         joints: [rowStart, step],
         breaks: breaks
      }, false) as TrackLayout;
   })

   return tracks;
}
