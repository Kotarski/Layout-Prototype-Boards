namespace Utility {
   export function cartesianToPolar(vector: Global.Types.vector) {
      return {
         radius: Math.sqrt(Math.pow(vector.X, 2) + Math.pow(vector.Y, 2)),
         angle: Math.atan(vector.Y / vector.X)
      };
   }
}

