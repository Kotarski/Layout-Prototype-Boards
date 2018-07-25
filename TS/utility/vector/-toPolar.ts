namespace Utility.Vector {
   export function toPolar(vector: Global.Types.vector): Global.Types.polar {
      return {
         radius: Math.sqrt(Math.pow(vector.x, 2) + Math.pow(vector.y, 2)),
         angle: Math.atan(vector.y / vector.x)
      };
   }
}

