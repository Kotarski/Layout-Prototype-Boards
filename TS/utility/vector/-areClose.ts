namespace Utility.Vector {
   export function areClose(vectorA: Global.Types.vector, vectorB: Global.Types.vector, closeBoundary: number = 1): boolean {
      const vectorXisClose = (Math.abs(vectorA.X - vectorB.X) < closeBoundary);
      const vectorYisClose = (Math.abs(vectorA.Y - vectorB.Y) < closeBoundary);
      return (vectorXisClose && vectorYisClose)
   };
}
