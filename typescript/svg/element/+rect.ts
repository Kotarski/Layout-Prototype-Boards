import { size, Vector } from "../../++types";
import { make as makeElement } from "../+element";
import svg from "../-svg";

export type type = ReturnType<typeof make>;
export function make(centre: Vector, size: size, cornerRounding: Vector = { x: 0, y: 0 }, classes: string = "") {
   const element: SVGRectElement = makeElement("rect", classes);
   element.setAttribute("x", (centre.x - size.width / 2).toString());
   element.setAttribute("y", (centre.y - size.height / 2).toString());
   element.setAttribute("width", size.width.toString());
   element.setAttribute("height", size.height.toString());
   element.setAttribute("rx", cornerRounding.x.toString());
   element.setAttribute("ry", cornerRounding.y.toString());
   return svg(element);
}

