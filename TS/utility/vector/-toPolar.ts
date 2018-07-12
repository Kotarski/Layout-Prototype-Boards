namespace Utility.Vector {
   export function toPolar(vector: Global.Types.vector): Global.Types.polar {
      return {
         radius: Math.sqrt(Math.pow(vector.X, 2) + Math.pow(vector.Y, 2)),
         angle: Math.atan(vector.Y / vector.X)
      };
   }
}

