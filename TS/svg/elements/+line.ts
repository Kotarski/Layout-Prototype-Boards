namespace Svg.Elements {
   export class Line extends Svg.Element {
      constructor(startVector: Global.Types.vector, endVector: Global.Types.vector, classes: string = "") {
         super('line', classes);
         this.element.setAttribute("x1", startVector.X.toString());
         this.element.setAttribute("y1", startVector.Y.toString());

         this.element.setAttribute("x2", endVector.X.toString());
         this.element.setAttribute("y2", endVector.Y.toString());
      }
   }
}
