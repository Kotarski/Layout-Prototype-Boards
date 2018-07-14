namespace Svg.Elements {
   export class Rect extends Svg.Element {
      constructor(centre: Global.Types.vector, size: Global.Types.size, cornerRounding: Global.Types.vector = { X: 0, Y: 0 }, classes: string = "") {
         super('rect', classes);

         this.element.setAttribute("x", (centre.X - size.width / 2).toString());
         this.element.setAttribute("y", (centre.Y - size.height / 2).toString());
         this.element.setAttribute("width", size.width.toString());
         this.element.setAttribute("height", size.height.toString());
         this.element.setAttribute("rx", cornerRounding.X.toString());
         this.element.setAttribute("ry", cornerRounding.Y.toString());
      }
   }
}
