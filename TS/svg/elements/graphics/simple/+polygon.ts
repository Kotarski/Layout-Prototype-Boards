namespace Svg.Elements.Graphics.Simples {
   export class Polygon extends Svg.Elements.Graphics.Simple {
      constructor(points: string, classes: string = "") {
         super('polygon', classes);
         this.element.setAttribute("points", points);
      }
   }
}
