namespace Utility.Polar {
   export function toVector(radius: number, angle: number): Global.Types.vector {
      return {
         x: radius * Math.cos(angle),
         y: radius * Math.sin(angle)
      };
   }
}


