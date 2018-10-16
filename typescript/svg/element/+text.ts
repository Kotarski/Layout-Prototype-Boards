import { make as makeElement } from "../+element";
import { make as makePath } from "./+path";
import { Vector } from "../../++types";
import svg from "../-svg";
//import * as $ from 'jquery';

let textPathCount = 0;
export type type = ReturnType<typeof make>;
export function make(text: string, startVector: Vector, classes: string = "") {
   const element: SVGTextElement = makeElement("text", classes);
   element.setAttribute('x', startVector.x.toString());
   element.setAttribute('y', startVector.y.toString());
   element.appendChild(document.createTextNode(text));
   return svg(element);
}

export namespace Functions {
   export function followPath<T extends SVGTextElement>(element: T) {
      return (pathString: string) => {
         // Make a new path
         let path = makePath(pathString);
         $(path.element).hide();

         // Give it a generated (hopefully unique)  ID
         let pathID = "pathForText" + textPathCount;
         path.element.setAttribute("id", pathID);
         textPathCount += 1;

         // Make the text path, and link it to the path
         let textPathEl = makeElement("textPath");
         textPathEl.setAttribute("href", "#" + pathID);

         // Get text content, remove from textEl and add to text pathEl
         let text = $(element).text();
         $(element).text("");
         textPathEl.appendChild(document.createTextNode(text));

         // Add the path and textpath as children
         element.appendChild(path.element);
         element.appendChild(textPathEl);
         return svg(element);
      }
   }

   export function rotatePosition<T extends SVGTextElement>(element: T) {
      return (rotation: number) => {
         const position = {
            x: Number(element.getAttribute("x")),
            y: Number(element.getAttribute("y"))
         }
         svg(element).rotate(rotation).rotate(-rotation, position);

         if (25 < rotation && rotation < 155) {
            $(element).css("text-anchor", "start");
         } else if (-155 < rotation && rotation < -25) {
            $(element).css("text-anchor", "end");
         } else {
            $(element).css("text-anchor", "middle");
         }

         if (135 < rotation || rotation < -135) {
            $(element).css("alignment-baseline", "hanging");
         } else if (-55 < rotation && rotation < 45) {
            $(element).css("alignment-baseline", "baseline");
         } else {
            $(element).css("alignment-baseline", "middle");
         }

         return svg(element);
      }
   }

}
