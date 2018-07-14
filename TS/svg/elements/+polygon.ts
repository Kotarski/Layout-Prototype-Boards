namespace Svg.Elements {
   export class Polygon extends Svg.Element {
      constructor(points: string, classes: string = "") {
         super('polygon', classes);
         this.element.setAttribute("points", points);
      }
   }
}
