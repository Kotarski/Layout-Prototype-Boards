import { Vector, AnyVector, UVector } from "../-vector";

export function isVector(inVector: any): inVector is AnyVector {
   return inVector && (isLVector(inVector) || isUVector(inVector));
}

export function isVectorArray(inVectors: any): inVectors is AnyVector[] {
   return (
      inVectors instanceof Array &&
      inVectors.every(isVector)
   );
}

export function isLVector(inVector: any): inVector is Vector {
   return (
      (typeof inVector.x === 'number') &&
      (typeof inVector.y === 'number')
   );
}

export function isUVector(inVector: any): inVector is UVector {
   return (
      (typeof inVector.X === 'number') &&
      (typeof inVector.Y === 'number')
   );
}
