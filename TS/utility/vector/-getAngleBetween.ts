namespace Utility.Vector {
   /** Return value in radians, from x axis */
   export function getAngleBetween(from: Global.Types.vector, to: Global.Types.vector): number {
      return Math.atan2(to.y - from.y, to.x - from.x) * 180 / Math.PI;
   }
}
