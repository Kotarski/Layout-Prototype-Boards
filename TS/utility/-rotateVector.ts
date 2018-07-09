namespace Utility {
   export function rotateVector(vector: Global.Types.vector, angle: number): Global.Types.vector {
      let radians = (Math.PI / 180) * angle;
      let cos = Math.cos(radians);
      let sin = Math.sin(radians);

      let rotatedVector: Global.Types.vector = {
         X: (cos * vector.X) + (sin * vector.Y),
         Y: (cos * vector.Y) - (sin * vector.X)
      };

      return rotatedVector;
   }
}
