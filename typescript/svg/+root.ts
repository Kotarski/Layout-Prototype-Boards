namespace Svg {
   export class Root {
      element = Svg.Element.SVG.make();
      group = Svg.Element.Group.make();
      constructor(classes: string = "") {
         $(this.element.element).addClass(classes);
      }

      draw(node: HTMLDivElement) {
         this.element.append(this.group);
         node.appendChild(this.element.element);

         Svg.Addins.Draggable.init(this.group.element, {
            grid: "off",
            eventTarget: this.element.element,
            useHelper: true,
         });
         Svg.Addins.Scaleable.init(this.group.element, {
            eventTarget: this.element.element,
         });
      }
   }
}