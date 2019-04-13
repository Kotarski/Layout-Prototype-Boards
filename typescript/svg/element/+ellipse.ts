import { Vector } from "../../++types";
import { makeElement as makeElement } from "../+element";
import svg from "../-svg";

export type ellipse = ReturnType<typeof makeEllipse>;
export function makeEllipse(centreVector: Vector, radiusVector: Vector, classes: string = "") {
   const element: SVGEllipseElement = makeElement("ellipse", classes);
   element.setAttribute("cx", centreVector.x.toString());
   element.setAttribute("cy", centreVector.y.toString());
   element.setAttribute("rx", radiusVector.x.toString());
   element.setAttribute("ry", radiusVector.y.toString());
   return svg(element);
}
