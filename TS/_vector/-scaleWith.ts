namespace _vector {

   type PartialVector = Partial<Vector>;

   export function scaleWithS(inVector: Vector) {
      return (scaleVector: PartialVector) => {
         return vector(scale(inVector, scaleVector));
      };
   }

   export function scaleWithM(inVectors: Vector[]) {
      return (scaleVector: PartialVector) => {
         return vector(inVectors.map(a => {
            return scale(a, scaleVector);
         }));
      }
   }

   function scale(a: Vector, b: PartialVector) {
      return {
         x: a.x * (b.x || 1),
         y: a.y * (b.y || 1)
      }
   }
}

