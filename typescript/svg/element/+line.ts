import { Vector } from "../../++types";
import { make as makeElement } from "../+element";
import svg from "../-svg";

export type type = ReturnType<typeof make>;
export function make(startVector: Vector, endVector: Vector, classes: string = "") {
   const element: SVGLineElement = makeElement("line", classes);
   element.setAttribute("x1", startVector.x.toString());
   element.setAttribute("y1", startVector.y.toString());

   element.setAttribute("x2", endVector.x.toString());
   element.setAttribute("y2", endVector.y.toString());
   return svg(element);
}

