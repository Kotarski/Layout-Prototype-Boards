namespace Utility {
   type point = SVGPoint;
   export function pointsAreClose(vectorA: point, vectorB: point, closeBoundary: number = 1): boolean {
      return (
         Math.abs(vectorA.x - vectorB.x) < closeBoundary &&
         Math.abs(vectorA.y - vectorB.y) < closeBoundary
      )
   };
}
