namespace Svg.Elements.Graphics.Simples {
   export class Ellipse extends Svg.Elements.Graphics.Simple {
      constructor(centreVector: Global.Types.vector, radiusVector: Global.Types.vector, classes: string = "") {
         super('ellipse', classes);
         this.element.setAttribute("cx", centreVector.X.toString());
         this.element.setAttribute("cy", centreVector.Y.toString());
         this.element.setAttribute("rx", radiusVector.X.toString());
         this.element.setAttribute("ry", radiusVector.Y.toString());
      }
   }
}
