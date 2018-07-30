namespace Utility.Polar {
   export function toVector(radius: number, angle: number): Vector {
      const rads = Utility.degreesToRadians(angle)
      return {
         x: radius * Math.cos(rads),
         y: radius * Math.sin(rads)
      };
   }
}


