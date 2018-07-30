namespace _vector {

   export function sumWithS(inVector: Vector) {
      return (...sumVectors: Vector[]) => {
         return vector(add(inVector, sum(sumVectors)));
      };
   }

   export function sumWithM(inVectors: Vector[]) {
      return (...sumVectors: Vector[]) => {
         let b = sum(sumVectors)
         return vector(inVectors.map(a => {
            return add(a, b);
         }));
      }
   }

   function add(a: Vector, b: Vector) {
      return {
         x: a.x + b.x,
         y: a.y + b.y
      }
   }

   function sum(inVectors: Vector[]) {
      let sum: Vector = { x: 0, y: 0 };
      inVectors.forEach(inVector => {
         sum = add(sum, inVector)
      });
      return sum;
   }
}

