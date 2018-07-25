namespace Utility.Vector {
   export function rotate(vector: Global.Types.vector, angle: number): Global.Types.vector {
      let radians = (Math.PI / 180) * angle;
      let cos = Math.cos(radians);
      let sin = Math.sin(radians);

      let rotatedVector: Global.Types.vector = {
         x: (cos * vector.x) + (sin * vector.y),
         y: (cos * vector.y) - (sin * vector.x)
      };

      return rotatedVector;
   }
}
