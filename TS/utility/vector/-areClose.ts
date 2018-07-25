namespace Utility.Vector {
   export function areClose(vectorA: Global.Types.vector, vectorB: Global.Types.vector, closeBoundary: number = 5): boolean {
      const vectorXisClose = (Math.abs(vectorA.x - vectorB.x) < closeBoundary);
      const vectorYisClose = (Math.abs(vectorA.y - vectorB.y) < closeBoundary);
      return (vectorXisClose && vectorYisClose)
   };
}
