import vector, { Vector } from "../-vector";
export function truncateS<T extends Vector>(inVector: T) {
   return () => {
      return vector({
         x: Math.round(inVector.x),
         y: Math.round(inVector.y)
      })
   }
}

export function truncateM<T extends Vector>(inVectors: T[]) {
   return () => {
      return vector(inVectors.map(inVector => ({
         x: Math.round(inVector.x),
         y: Math.round(inVector.y)
      })));
   };
}


