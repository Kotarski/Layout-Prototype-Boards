namespace Utility {
   type vector = {
      X: number,
      Y: number
   };
   export function vectorsAreClose(vectorA: vector, vectorB: vector, closeBoundary: number = 1): boolean {
      const vectorXisClose = (Math.abs(vectorA.X - vectorB.X) < closeBoundary);
      const vectorYisClose = (Math.abs(vectorA.Y - vectorB.Y) < closeBoundary);
      return (vectorXisClose && vectorYisClose)
   };
}
