namespace Svg.Elements {
   export class Text extends Svg.Element {
      constructor(text: string, startVector: Global.Types.vector, rotateAnchor: boolean = false, classes: string = "") {
         super('text', classes);
         this.element.setAttribute('x', startVector.X.toString());
         this.element.setAttribute('y', startVector.Y.toString());
         this.element.appendChild(document.createTextNode(text));
      }
   }
}
