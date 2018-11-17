import { Vector } from "../-vector";
import radiansToDegrees from "../utility/-radiansToDegrees"
export default function asPolar<T extends Vector>(inVector: T) {
   return () => {
      return {
         radius: Math.sqrt(Math.pow(inVector.x, 2) + Math.pow(inVector.y, 2)),
         angle: radiansToDegrees(Math.atan2(inVector.y, inVector.x))
      };
   }
}

