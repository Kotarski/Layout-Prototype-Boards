import { Vector } from "../-vector";
export default function isCloseTo(inVector: Vector) {
   return (compareVector: Vector, boundary: number = 5) => {

      const vectorXisClose = (Math.abs(inVector.x - compareVector.x) < boundary);
      const vectorYisClose = (Math.abs(inVector.y - compareVector.y) < boundary);
      return (vectorXisClose && vectorYisClose)
   }
}
