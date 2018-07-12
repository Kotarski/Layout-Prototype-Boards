namespace Utility.Vector {
   /** Return value in radians, from x axis */
   export function getAngleBetween(from: Global.Types.vector, to: Global.Types.vector): number {
      return Math.atan2(from.Y - to.Y, from.X - to.X);
   }
}
