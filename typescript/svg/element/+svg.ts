import { makeElement as makeElement } from "../+element";
import svg from "../-svg";

export function make(classes: string = "") {
   const element: SVGSVGElement = makeElement("svg", classes);
   return svg(element);
}

