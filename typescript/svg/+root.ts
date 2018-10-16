import { make as makeSvg } from "./element/+svg";
import { make as makeGroup } from "./element/+group";
import Draggable from "./addins/draggable";
import Scaleable from "./addins/scaleable";
//import * as $ from 'jquery';
export default class Root {
   element = makeSvg();
   group = makeGroup();
   constructor(classes: string = "") {
      $(this.element.element).addClass(classes);
   }

   draw(node: HTMLDivElement) {
      this.element.append(this.group);
      node.appendChild(this.element.element);

      Draggable.init(this.group.element, {
         grid: "off",
         eventTarget: this.element.element,
         useHelper: true,
      });
      Scaleable.init(this.group.element, {
         eventTarget: this.element.element,
      });
   }
}
