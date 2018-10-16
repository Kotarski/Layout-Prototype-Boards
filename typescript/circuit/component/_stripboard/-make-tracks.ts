import { Layout as Stripboard } from "./~classes";
import { Layout as Track } from "../_track/~classes";
import TrackMap from "../_track/-maps";
import vector from "../../../-vector";

import { gridSpacing } from "../../../~constants";

export default function makeTracks(parent: Stripboard): Track[] {
   let gS = gridSpacing;

   let rotation = vector(parent.joints[0]).getAngleTo(parent.joints[1]);

   let start = vector({
      x: -((parent.columns - 1) * gS / 2),
      y: -((parent.rows - 1) * gS / 2)
   }).rotate(rotation).sumWith(parent.joints[0]);


   let step = vector({ x: gS, y: 0 }).rotate(rotation);


   let tracks: Track[] = [];

   for (let row = 0; row < parent.rows; row++) {

      let rowStart = start.sumWith(
         vector({ x: 0, y: row * gS }).rotate(rotation)).vector;


      let holeSpacings: number[] = [0].concat(Array(parent.columns - 1).fill(1));
      let track = TrackMap.make({
         holeSpacings: holeSpacings,
         style: "stripboard",
         joints: [rowStart, step]
      }, false);
      //track.group.translate({ x: 0, y: row * gS }).rotate(0);
      tracks.push(track);
   }

   return tracks;
}
