namespace Circuit.Component._Track {

   const drawStripboardHole = (position: Vector) => Svg.Element.Circle.make(position, 4, "hole");
   const drawBreadboardHole = (position: Vector) => Svg.Element.Rect.make(position, { width: 8, height: 8 }, vector(0.5), "hole");

   export function drawLayout(instance: Classes.Layout) {
      const holeFunc = (instance.style === "breadboard") ? drawBreadboardHole : drawStripboardHole;

      const start = instance.joints[INDEXSTART];
      const step = instance.joints[INDEXSTEP];

      // Create the holes
      const holePositions = vector(step).scaleMap(Utility.cumulativeSum(...instance.holeSpacings)).sumWith(start).vectors;

      const holes = holePositions.map(hp => holeFunc(hp))

      const track = drawTrack(holePositions);

      return [track, ...holes]
   }

   const drawTrack = (holePositions: Vector[]) => {
      let start = holePositions[0];
      let end = holePositions[holePositions.length - 1];
      //: Vector, step: Vector, stepCount: number
      // Create the track
      let relativeEnd = vector(end, vector(start).scaleWith(-1)).sum();

      let { radius, angle } = relativeEnd.asPolar();

      let centre = vector(start, start, relativeEnd).sum().scaleWith(0.5).vector;

      let size = {
         width: radius + Constants.gridSpacing * 0.8,
         height: Constants.gridSpacing * 14 / 16
      }

      return Svg.Element.Rect.make(centre, size, vector(0), 'body').rotate(angle, centre);
   }

}