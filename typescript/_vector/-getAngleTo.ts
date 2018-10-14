import { Vector } from "../-vector";
export default function getAngleTo<T extends Vector>(inVector: T) {
   return (compareVector: Vector) => {
      return Math.atan2(compareVector.y - inVector.y, compareVector.x - inVector.x) * 180 / Math.PI;
   }
}

