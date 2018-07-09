namespace Svg.Elements.Graphics.Simples {
   export class Text extends Svg.Elements.Graphics.Simple {
      constructor(text: string, startVector: Global.Types.vector, rotateAnchor: boolean = false, classes: string = "") {
         super('text', classes);
         this.element.setAttribute('x', startVector.X.toString());
         this.element.setAttribute('y', startVector.Y.toString());
         this.element.appendChild(document.createTextNode(text));
      }
   }
}
