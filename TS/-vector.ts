/// <reference path="./_vector/-standardise.ts" />

/// <reference path="./_vector/-sumWith.ts" />
/// <reference path="./_vector/-centreWith.ts" />
/// <reference path="./_vector/-rotate.ts" />
/// <reference path="./_vector/-snapToGrid.ts" />

/// <reference path="./_vector/-getAngleTo.ts" />
/// <reference path="./_vector/-asPolar.ts" />
/// <reference path="./_vector/-isCloseTo.ts" />

/// <reference path="./_vector/-sum.ts" />
/// <reference path="./_vector/-centre.ts" />

/// <reference path="./_vector/-isVector.ts" />


type Vector = { x: number, y: number };
type LVector = Vector;
type UVector = { X: number, Y: number };
type AnyVector = LVector | UVector;

namespace _vector {
   const singleExtension = (inVector: Vector) => {
      return {
         vector: inVector,
         getAngleTo: _vector.getAngleTo(inVector),
         asPolar: _vector.asPolar(inVector),
         isCloseTo: _vector.isCloseTo(inVector),

         sumWith: _vector.sumWithS(inVector),
         centreWith: _vector.centreWith(inVector),
         rotate: _vector.rotateS(inVector),
         snapToGrid: _vector.snapToGrid(inVector)
      }
   }

   const multiExtension = (inVectors: Vector[]) => {
      return {
         vectors: inVectors,
         sum: _vector.sum(inVectors),
         sumWith: _vector.sumWithM(inVectors),
         rotate: _vector.rotateM(inVectors),
         centre: _vector.centre(inVectors),
      }
   }

   type SingleVectorInterface = ReturnType<typeof singleExtension>;
   type MultiVectorInterface = ReturnType<typeof multiExtension>;

   function vectorFunction<T extends AnyVector>(inVectors: T): SingleVectorInterface;
   function vectorFunction<T extends AnyVector>(inVectors: T[]): MultiVectorInterface;
   function vectorFunction<T extends AnyVector>(inVectors: T, ...moreVectors: T[]): MultiVectorInterface;
   function vectorFunction<T extends AnyVector, A extends T | T[]>(
      inVectors: A, ...moreVectors: T[]
   ): SingleVectorInterface | MultiVectorInterface {
      const vectorsAsArray = ((inVectors instanceof Array) ? inVectors : [inVectors]) as Array<T>;
      const moreVectorsAsArray = (moreVectors !== undefined) ? moreVectors : [];

      const vCopy = _vector.standardise(vectorsAsArray.concat(moreVectorsAsArray));

      const isSingle = (vCopy.length === 1 && !(inVectors instanceof Array));
      const ismulti = vCopy.length > 1;

      const single = (isSingle) ? singleExtension(vCopy[0]) : null;
      const array = (ismulti) ? multiExtension(vCopy) : null;


      return Object.assign({}, single, array) as (
         ((A & typeof moreVectors) extends Array<T> ?
            MultiVectorInterface :
            SingleVectorInterface)
      );
   }
   const vectorObject = {
      sumWith: _vector.sumWithS,
      getAngleTo: _vector.getAngleTo,
      isCloseTo: _vector.isCloseTo,
      centreWith: _vector.centreWith,
      rotate: _vector.rotateS,
      snapToGrid: _vector.snapToGrid,
      asPolar: _vector.asPolar,
      standardise: _vector.standardise,
      isVector: _vector.isVector,
      isVectorArray: _vector.isVectorArray,
   }

   export const vector = Object.assign(vectorFunction, vectorObject);
}

const vector = _vector.vector;






