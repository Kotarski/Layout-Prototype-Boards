namespace Utility.Polar {
   export function toVector(radius: number, angle: number): Global.Types.vector {
      return {
         X: radius * Math.cos(angle),
         Y: radius * Math.sin(angle)
      };
   }
}


