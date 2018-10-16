import { Vector } from "../++types";
import { make } from "./+element";
export default function makePoint(vector: Vector): SVGPoint {
   const point = make<SVGSVGElement>("svg").createSVGPoint();
   point.x = vector.x;
   point.y = vector.y;
   return point;
}

