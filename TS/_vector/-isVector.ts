

namespace _vector {

   export function isVector(inVector: any): inVector is AnyVector {
      return (isLVector(inVector) || isUVector(inVector));
   }

   export function isVectorArray(inVectors: any[]): inVectors is AnyVector[] {
      return (
         inVectors instanceof Array &&
         inVectors.every(isVector)
      );
   }

   export function isLVector(inVector: any): inVector is Vector {
      return (
         inVector.hasOwnProperty("x") &&
         inVector.hasOwnProperty("y") &&
         (typeof inVector.x === 'number') &&
         (typeof inVector.y === 'number')
      );
   }

   export function isUVector(inVector: any): inVector is UVector {
      return (
         inVector.hasOwnProperty("X") &&
         inVector.hasOwnProperty("Y") &&
         (typeof inVector.X === 'number') &&
         (typeof inVector.Y === 'number')
      );
   }
}
