namespace Circuit.Component._Breadboard {

   export function makeTracks(parent: Classes.Small, size: "small"): Addins.Board.Track.Instance[];
   export function makeTracks(parent: Classes.Large, size: "large"): Addins.Board.Track.Instance[];
   export function makeTracks(parent: Classes.Small | Classes.Large, size: "small" | "large") {
      return (size === "small") ? makeTracksSmall(parent) : makeTracksLarge(parent);
   }

   function makeTracksSmall(parent: Classes.Small): Addins.Board.Track.Instance[] {
      let tracks: Addins.Board.Track.Instance[] = [];

      let gS = Constants.gridSpacing;

      let rotation = vector(parent.joints[0]).getAngleTo(parent.joints[1]);

      let powerTrackYPositions = [-9.5, -8.5, 8.5, 9.5];
      for (let y of powerTrackYPositions) {

         const start = vector({ x: gS * -14, y: y * gS })
            .rotate(rotation)
            .sumWith(parent.joints[0]);

         const step = vector({ x: gS, y: 0 }).rotate(rotation);

         let track = Addins.Board.Track.make({
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

            let track = Addins.Board.Track.make({
               holeSpacings: [0, 1, 1, 1, 1],
               joints: [start, step]
            });
            tracks.push(track);
         }
      }

      return tracks;
   }

   function makeTracksLarge(parent: Classes.Large): Addins.Board.Track.Instance[] {
      let tracks: Addins.Board.Track.Instance[] = [];

      let gS = Constants.gridSpacing;

      let rotation = vector(parent.joints[0]).getAngleTo(parent.joints[1]);


      let powerTrackYPositions = [-9.5, -8.5, 8.5, 9.5];
      let powerTrackXPositions = [-29.5, 1.5];
      for (let x of powerTrackXPositions) {
         for (let y of powerTrackYPositions) {

            const start = vector({ x: x * gS, y: y * gS })
               .rotate(rotation)
               .sumWith(parent.joints[0]);

            const step = vector({ x: gS, y: 0 }).rotate(rotation);

            let track = Addins.Board.Track.make({
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

            let track = Addins.Board.Track.make({
               holeSpacings: [0, 1, 1, 1, 1],
               joints: [start, step]
            }, false);
            tracks.push(track);
         }
      }

      return tracks;
   }
}