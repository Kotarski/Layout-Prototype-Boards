namespace Utility {
   /** Return value in radians */
   export function angleBetween(a: Global.Types.vector, b: Global.Types.vector): number {
      return Math.atan2(a.Y - b.Y, a.X - b.X);
   }
}
