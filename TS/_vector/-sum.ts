namespace _vector {
   export function sum(inVectors: Vector[]) {
      return () => {
         let sum: Vector = { x: 0, y: 0 };
         inVectors.forEach(inVector => {
            sum.x += inVector.x;
            sum.y += inVector.y;
         })
         return vector(sum);
      }
   }
}
