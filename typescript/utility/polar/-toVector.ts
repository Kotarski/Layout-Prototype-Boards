import degreesToRadians from "../-degreesToRadians"
import { Vector } from "../../++types"
export default function toVector(radius: number, angle: number): Vector {
   const rads = degreesToRadians(angle)
   return {
      x: radius * Math.cos(rads),
      y: radius * Math.sin(rads)
   };
}


