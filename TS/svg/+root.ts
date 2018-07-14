namespace Svg {
   export class Root {
      element: SVGSVGElement;
      group: Svg.Elements.Group;
      children: Svg.Elements.Group[] = [];
      constructor(classes?: string) {
         let svgns: string = Constants.svgURI;
         this.element = document.createElementNS(svgns, 'svg') as SVGSVGElement;
         if (classes) $(this.element).addClass(classes);

         this.group = new Svg.Elements.Group();

         this.children = [this.group];
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