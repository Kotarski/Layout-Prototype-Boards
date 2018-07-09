namespace Svg.Elements.Graphics.Simples {
   export class Circle extends Svg.Elements.Graphics.Simple {
      constructor(centreVector: Global.Types.vector, radius: number, classes: string = "") {
         super('circle', classes);
         this.element.setAttribute("cx", centreVector.X.toString());
         this.element.setAttribute("cy", centreVector.Y.toString());
         this.element.setAttribute("r", radius.toString());
      }
   }
}
