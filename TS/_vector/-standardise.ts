namespace _vector {
   export function standardise<T extends AnyVector>(vectors: T): Vector;
   export function standardise<T extends AnyVector>(vectors: T[]): Vector[];
   export function standardise<T extends AnyVector>(vectors: T, ...moreVectors: T[]): Vector[];
   export function standardise<T extends AnyVector, A extends T | T[], B extends T[]>(
      inVectors: A, moreVectors?: B
   ): Vector | Vector[] {

      const vectorsAsArray = ((inVectors instanceof Array) ? inVectors : [inVectors]) as Array<T>;
      const moreVectorsAsArray = (moreVectors !== undefined) ? moreVectors : [];

      const standardised = (vectorsAsArray.concat(moreVectorsAsArray)).map(inVector => {
         if (isLVector(inVector)) {
            return { x: inVector.x, y: inVector.y }
         } else if (isUVector(inVector)) {
            return { x: inVector.X, y: inVector.Y }
         } else {
            //TODO 
            console.error("IS NOT A VECTOR")
            return { x: NaN, y: NaN };
         }
      });

      return (standardised.length === 1 && !(inVectors instanceof Array)) ? standardised[0] : standardised;
   }
}
