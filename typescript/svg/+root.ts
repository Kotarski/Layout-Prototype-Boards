import { make as makeSvg } from "./element/+svg";
import { makeGroup as makeGroup } from "./element/+group";
import Draggable from "./addins/draggable"
import Scaleable from "./addins/scaleable";
import { makeElement } from "./+element";
//import * as $ from 'jquery';
export default class Root {
   element = makeSvg();
   group = makeGroup();
   constructor(classes: string = "") {
      $(this.element.element).addClass(classes);
   }

   draw(node: HTMLDivElement) {
      this.element.append(this.group);
      this.group.append(
         makeElement<SVGGraphicsElement>("marker-back"),
         makeElement<SVGGraphicsElement>("marker-mid"),
         makeElement<SVGGraphicsElement>("marker-fore")
      )
      node.appendChild(this.element.element);

      Draggable.init(this.element.element);

      Scaleable.init(this.group.element, {
         eventTarget: this.element.element,
      });
   }
}
