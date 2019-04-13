import { Vector } from "../../++types";
import { makeElement as makeElement } from "../+element";
import svg from "../-svg";

export type line = ReturnType<typeof makeLine>;
export function makeLine(startVector: Vector, endVector: Vector, classes: string = "") {
   const element: SVGLineElement = makeElement("line", classes);
   element.setAttribute("x1", startVector.x.toString());
   element.setAttribute("y1", startVector.y.toString());

   element.setAttribute("x2", endVector.x.toString());
   element.setAttribute("y2", endVector.y.toString());
   return svg(element);
}

