namespace Utility {
   export function polarToCartesian(radius: number, angle: number): Global.Types.vector {
      return {
         X: radius * Math.cos(angle),
         Y: radius * Math.sin(angle)
      };
   }
}


