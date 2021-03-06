import { Vector, AnyVector } from "../-vector";
import { isLVector, isUVector, isVectorArray } from "./-isVector"

export default function standardise(inVector: AnyVector): Vector;
export default function standardise(inVector: number): Vector;
export default function standardise(inVectors: AnyVector[]): Vector[];
export default function standardise(inVector: AnyVector, ...moreVectors: AnyVector[]): Vector[];
export default function standardise(inVectors: AnyVector | AnyVector[] | number, ...moreVectors: AnyVector[]): Vector | Vector[];
export default function standardise(inVectors: AnyVector | AnyVector[] | number, ...moreVectors: AnyVector[]): Vector | Vector[] {

   if (typeof inVectors === "number") {
      return { x: inVectors, y: inVectors };
   }

   const vectorsAsArray = ((isVectorArray(inVectors)) ? inVectors : [inVectors]) as Array<AnyVector>;
   const moreVectorsAsArray = ((moreVectors !== undefined) ? moreVectors : []) as Array<AnyVector>;

   const standardised = (vectorsAsArray.concat(moreVectorsAsArray)).map(inVector => {
      if (isLVector(inVector)) {
         return { x: inVector.x, y: inVector.y };
      } else if (isUVector(inVector)) {
         return { x: inVector.X, y: inVector.Y };
      } else if (inVector instanceof Array && (typeof inVector[0] === "number") && (typeof inVector[1] === "number")) {
         return { x: inVector[0], y: inVector[1] };
      } else {
            //TODO 
            /*LOGSTART*/console.error("IS NOT A VECTOR")/*LOGEND*/
         return { x: NaN, y: NaN };
      }
   });

   if (standardised.length > 1 || isVectorArray(inVectors)) {
      return standardised;
   } else {
      return standardised[0]
   }
}

