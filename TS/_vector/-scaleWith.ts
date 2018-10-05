namespace _vector {

   type PartialVector = Partial<Vector>;

   export function scaleWithS(inVector: Vector) {
      return (scaleIn: PartialVector | number) => {
         const scaleVector = (typeof scaleIn === "number") ? { x: scaleIn, y: scaleIn } : scaleIn;
         return vector(scale(inVector, scaleVector));
      };
   }

   export function scaleMapS(inVector: Vector) {
      return (scaleIns: (PartialVector | number)[]) => {
         return vector(scaleIns.map(scaleIn => {
            const scaleVector = (typeof scaleIn === "number") ? { x: scaleIn, y: scaleIn } : scaleIn;
            return scale(inVector, scaleVector);
         }))
      };
   }

   export function scaleWithM(inVectors: Vector[]) {
      return (scaleIn: PartialVector | number) => {
         const scaleVector = (typeof scaleIn === "number") ? { x: scaleIn, y: scaleIn } : scaleIn;
         return vector(inVectors.map(a => {
            return scale(a, scaleVector);
         }));
      }
   }

   function scale(a: Vector, b: PartialVector) {
      let bV: Vector = {
         x: ((b.x !== undefined) ? b.x : 1),
         y: ((b.y !== undefined) ? b.y : 1)
      }
      return {
         x: a.x * bV.x,
         y: a.y * bV.y
      }
   }
}

