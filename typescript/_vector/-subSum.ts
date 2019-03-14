import vector, { Vector } from "../-vector";

export function subSumS(inVector: Vector) {
   return (...sumVectors: Partial<Vector>[]) => {
      return vector(sub(inVector, sum(sumVectors)));
   };
}

export function subSumM(inVectors: Vector[]) {
   return (...sumVectors: Partial<Vector>[]) => {
      let b = sum(sumVectors)
      return vector(inVectors.map(a => {
         return sub(a, b);
      }));
   }
}

function add(a: Partial<Vector>, b: Partial<Vector>) {
   return {
      x: (a.x || 0) + (b.x || 0),
      y: (a.y || 0) + (b.y || 0)
   }
}

function sub(a: Partial<Vector>, b: Partial<Vector>) {
   return {
      x: (a.x || 0) - (b.x || 0),
      y: (a.y || 0) - (b.y || 0)
   }
}

function sum(inVectors: Partial<Vector>[]) {
   let sum: Vector = { x: 0, y: 0 };
   inVectors.forEach(inVector => {
      sum = add(sum, inVector)
   });
   return sum;
}


