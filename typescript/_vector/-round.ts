import vector, { Vector } from "../-vector";
export function roundS<T extends Vector>(inVector: T) {
   return (to: Vector | number = 1) => {
      const t: Vector = typeof to === "number" ? { x: to, y: to } : to;
      return vector({
         x: Math.round(inVector.x / (t.x)) * (t.x),
         y: Math.round(inVector.y / (t.y)) * (t.y)
      })
   }
}

export function roundM<T extends Vector>(inVectors: T[]) {
   return (to: Vector | number = 1) => {
      const t: Vector = typeof to === "number" ? { x: to, y: to } : to;
      return vector(inVectors.map(inVector => ({
         x: Math.round(inVector.x / (t.x)) * (t.x),
         y: Math.round(inVector.y / (t.y)) * (t.y)
      })));
   };
}


