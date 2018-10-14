import asPolar from "./_vector/-asPolar";
import centre from "./_vector/-centre";
import centreWith from "./_vector/-centreWith";
import getAngleTo from "./_vector/-getAngleTo";
import isCloseTo from "./_vector/-isCloseTo";
import { isVector, isVectorArray } from "./_vector/-isVector"
import { rotateM, rotateS } from "./_vector/-rotate";
import { scaleMapS, scaleWithM, scaleWithS } from "./_vector/-scaleWith";
import { snapToGridM, snapToGridS } from "./_vector/-snapToGrid";
import standardise from "./_vector/-standardise";
import sum from "./_vector/-sum";
import { sumWithM, sumWithS } from "./_vector/-sumWith";

export type Vector = { x: number, y: number };
export type LVector = Vector;
export type UVector = { X: number, Y: number };
export type AVector = [number, number];
export type AnyVector = LVector | UVector | AVector;

const singleExtension = (inVector: Vector) => {
   return {
      vector: inVector,
      x: inVector.x,
      y: inVector.y,
      getAngleTo: getAngleTo(inVector),
      asPolar: asPolar(inVector),
      isCloseTo: isCloseTo(inVector),

      sumWith: sumWithS(inVector),
      scaleWith: scaleWithS(inVector),
      scaleMap: scaleMapS(inVector),
      centreWith: centreWith(inVector),
      rotate: rotateS(inVector),
      snapToGrid: snapToGridS(inVector)
   }
}

const multiExtension = (inVectors: Vector[]) => {
   return {
      vectors: inVectors,
      sum: sum(inVectors),
      sumWith: sumWithM(inVectors),
      scaleWith: scaleWithM(inVectors),
      rotate: rotateM(inVectors),
      centre: centre(inVectors),
      snapToGrid: snapToGridM(inVectors)
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

   const vCopy = standardise(inVectors, ...moreVectors);

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
   sumWith: sumWithS,
   scaleWith: scaleWithS,
   getAngleTo: getAngleTo,
   isCloseTo: isCloseTo,
   centreWith: centreWith,
   rotate: rotateS,
   snapToGrid: snapToGridS,
   asPolar: asPolar,
   standardise: standardise,
   isVector: isVector,
   isVectorArray: isVectorArray,
}

const vector = Object.assign(vectorFunction, vectorObject);

export default vector;






