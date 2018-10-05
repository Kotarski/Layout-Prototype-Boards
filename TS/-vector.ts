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
type AVector = [number, number];
type AnyVector = LVector | UVector | AVector;

namespace _vector {
   const singleExtension = (inVector: Vector) => {
      return {
         vector: inVector,
         x: inVector.x,
         y: inVector.y,
         getAngleTo: _vector.getAngleTo(inVector),
         asPolar: _vector.asPolar(inVector),
         isCloseTo: _vector.isCloseTo(inVector),

         sumWith: _vector.sumWithS(inVector),
         scaleWith: _vector.scaleWithS(inVector),
         scaleMap: _vector.scaleMapS(inVector),
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
         scaleWith: _vector.scaleWithM(inVectors),
         rotate: _vector.rotateM(inVectors),
         centre: _vector.centre(inVectors),
      }
   }

   type SingleVectorInterface = ReturnType<typeof singleExtension>;
   type MultiVectorInterface = ReturnType<typeof multiExtension>;

   function vectorFunction(inVectors: AnyVector): SingleVectorInterface;
   function vectorFunction(inVectors: number): SingleVectorInterface;
   function vectorFunction(inVectors: AnyVector[]): MultiVectorInterface;
   function vectorFunction(inVectors: AnyVector, ...moreVectors: AnyVector[]): MultiVectorInterface;
   function vectorFunction<A extends AnyVector | AnyVector[] | number>(inVectors: A, ...moreVectors: AnyVector[]
   ): SingleVectorInterface | MultiVectorInterface {
      // const vectorsAsArray = ((inVectors instanceof Array) ? inVectors : [inVectors]) as Array<T>;
      // const moreVectorsAsArray = (moreVectors !== undefined) ? moreVectors : [];

      const vCopy = _vector.standardise(inVectors, ...moreVectors);

      const ext = (vCopy instanceof Array)
         ? multiExtension(vCopy)
         : singleExtension(vCopy);


      return Object.assign({}, ext) as (
         ((A & typeof moreVectors) extends Array<AnyVector> ?
            MultiVectorInterface :
            SingleVectorInterface)
      );
   }
   const vectorObject = {
      sumWith: _vector.sumWithS,
      scaleWith: _vector.scaleWithS,
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






