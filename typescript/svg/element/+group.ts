import { make as makeElement } from "../+element";
import svg from "../-svg";
//import * as $ from 'jquery';

export type type = ReturnType<typeof make>;
export function make(classes: string = "") {
   return svg(makeElement<SVGGElement>("g", classes));
}

export namespace Functions {
   type ElementSet = (
      SVGGraphicsElement |
      { element: SVGGraphicsElement }
      | SVGGraphicsElement[] |
      { element: SVGGraphicsElement }[])[];

   export function append<T extends SVGGElement>(element: T) {
      return (...elements: ElementSet) => {
         addChildren(element, (child: SVGGraphicsElement) => {
            element.appendChild(child);
         }, ...elements);
         return svg(element);
      }
   }

   //Note when given an array, the z-order is not reversed.
   export function prepend<T extends SVGGElement>(element: T) {
      return (...elements: ElementSet) => {
         let firstChild = element.firstChild;
         addChildren(element, (child: SVGGraphicsElement) => {
            element.insertBefore(child, firstChild);
         }, ...elements);
         return svg(element);
      }
   }

   export function clearChildren<T extends SVGGElement>(element: T) {
      return (inclusionSelector: string = "*") => {
         $(element).children(inclusionSelector).remove();
         return svg(element);
      }
   }

   function addChildren<GT extends SVGGElement>(
      to: GT,
      addCallback: (element: SVGGraphicsElement) => void,
      ...elements: ElementSet
   ): GT {
      elements.forEach(item => {
         //item = item instanceof Array ? item : [item];
         let asArray = item instanceof Array ? item : [item]
         asArray.forEach(member => {
            let element = member instanceof SVGGraphicsElement ? member : member.element;
            addCallback(element)
         });
      })

      // To allow method chaining;
      return to;
   }
}

