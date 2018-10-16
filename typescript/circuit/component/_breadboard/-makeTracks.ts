import { Small, Large } from "./~classes";
import { Layout as Track } from "../_track/~classes"
import trackMap from "../_track/-maps";
import vector from "../../../-vector";


import { gridSpacing } from "../../../~constants";

export default function makeTracks(parent: Small, size: "small"): Track[];
export default function makeTracks(parent: Large, size: "large"): Track[];
export default function makeTracks(parent: Small | Large, size: "small" | "large") {
   return (size === "small") ? makeTracksSmall(parent) : makeTracksLarge(parent);
}

function makeTracksSmall(parent: Small): Track[] {
   let tracks: Track[] = [];

   let gS = gridSpacing;

   let rotation = vector(parent.joints[0]).getAngleTo(parent.joints[1]);

   let powerTrackYPositions = [-9.5, -8.5, 8.5, 9.5];
   for (let y of powerTrackYPositions) {

      const start = vector({ x: gS * -14, y: y * gS })
         .rotate(rotation)
         .sumWith(parent.joints[0]);

      const step = vector({ x: gS, y: 0 }).rotate(rotation);

      let track = trackMap.make({
         holeSpacings: [0, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1],
         joints: [start, step]
      }, false);
      tracks.push(track);
   }

   let mainGridTrackXPositions = [...Array(30).keys()];
   let mainGridTrackYPositions = [-5.5, +1.5];

   for (let x of mainGridTrackXPositions) {
      for (let y of mainGridTrackYPositions) {

         const start = vector({ x: (x - 14.5) * gS, y: y * gS })
            .rotate(rotation)
            .sumWith(parent.joints[0]);

         const step = vector({ x: 0, y: gS }).rotate(rotation);

         let track = trackMap.make({
            holeSpacings: [0, 1, 1, 1, 1],
            joints: [start, step]
         }, false);
         tracks.push(track);
      }
   }

   return tracks;
}

function makeTracksLarge(parent: Large): Track[] {
   let tracks: Track[] = [];

   let gS = gridSpacing;

   let rotation = vector(parent.joints[0]).getAngleTo(parent.joints[1]);


   let powerTrackYPositions = [-9.5, -8.5, 8.5, 9.5];
   let powerTrackXPositions = [-29.5, 1.5];
   for (let x of powerTrackXPositions) {
      for (let y of powerTrackYPositions) {

         const start = vector({ x: x * gS, y: y * gS })
            .rotate(rotation)
            .sumWith(parent.joints[0]);

         const step = vector({ x: gS, y: 0 }).rotate(rotation);

         let track = trackMap.make({
            holeSpacings: [0, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1],
            joints: [start, step]
         }, false);
         tracks.push(track);
      }
   }

   let mainGridTrackXPositions = [...Array(64).keys()];
   let mainGridTrackYPositions = [-5.5, +1.5];

   for (let x of mainGridTrackXPositions) {
      for (let y of mainGridTrackYPositions) {

         const start = vector({ x: (x - 31.5) * gS, y: y * gS })
            .rotate(rotation)
            .sumWith(parent.joints[0]);

         const step = vector({ x: 0, y: gS }).rotate(rotation);

         let track = trackMap.make({
            holeSpacings: [0, 1, 1, 1, 1],
            joints: [start, step]
         }, false);
         tracks.push(track);
      }
   }

   return tracks;
}
