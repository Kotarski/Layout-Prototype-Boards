import { Vector } from "../++types";
import { makeElement } from "./+element";
export default function makePoint(vector: Vector): SVGPoint {
   const point = makeElement<SVGSVGElement>("svg").createSVGPoint();
   point.x = vector.x;
   point.y = vector.y;
   return point;
}

