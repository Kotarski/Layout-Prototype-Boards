import { Vector } from "../../++types";
import { makeElement as makeElement } from "../+element";
import svg from "../-svg";

export type circle = ReturnType<typeof makeCircle>;
export function makeCircle(centreVector: Vector, radius: number, classes: string = "") {
   const element: SVGCircleElement = makeElement("circle", classes);
   element.setAttribute("cx", centreVector.x.toString());
   element.setAttribute("cy", centreVector.y.toString());
   element.setAttribute("r", radius.toString());
   return svg(element);
}
