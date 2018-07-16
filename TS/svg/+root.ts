namespace Svg {
   export class Root {
      element: SVGSVGElement;
      group: Svg.Elements.Group;
      constructor(classes: string = "") {
         this.element = makeSVGElement("svg", classes);
         $(this.element).addClass(classes);

         this.group = new Svg.Elements.Group();
      }

      draw(node: HTMLDivElement) {
         this.element.appendChild(this.group.element);
         node.appendChild(this.element);

         Svg.Addins.Draggable.init(this.group, {
            grid: "off",
            eventTarget: this.element,
            useHelper: true,
         });
         Svg.Addins.Scaleable.init(this.group, {
            eventTarget: this.element,
         });
      }
   }
}