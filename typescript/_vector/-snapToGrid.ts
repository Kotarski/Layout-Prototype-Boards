import vector, { Vector } from "../-vector";
export function snapToGridS<T extends Vector>(inVector: T) {
   return (grid: Vector = { x: 10, y: 10 }) => {
      return vector({
         x: Math.round(inVector.x / (grid.x)) * (grid.x),
         y: Math.round(inVector.y / (grid.y)) * (grid.y)
      })
   }
}

export function snapToGridM<T extends Vector>(inVectors: T[]) {
   return (grid: Vector = { x: 10, y: 10 }) => {
      return vector(inVectors.map(inVector => ({
         x: Math.round(inVector.x / (grid.x)) * (grid.x),
         y: Math.round(inVector.y / (grid.y)) * (grid.y)
      })));
   };
}


