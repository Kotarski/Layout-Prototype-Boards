namespace Utility.Vector {
   type uCaseVector = { X: number, Y: number };
   export function standardise(vectors: uCaseVector): Global.Types.vector
   export function standardise(vectors: uCaseVector[]): Global.Types.vector[]
   export function standardise(vectors: uCaseVector | uCaseVector[]): Global.Types.vector | Global.Types.vector[] {
      if (vectors instanceof Array) {
         return vectors.map(vector => ({ x: vector.X, y: vector.Y }))
      } else {
         return { x: vectors.X, y: vectors.Y }
      }
   };
}
