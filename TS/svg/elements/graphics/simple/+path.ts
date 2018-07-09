namespace Svg.Elements.Graphics.Simples {
   export class Path extends Svg.Elements.Graphics.Simple {
      constructor(path: string, classes: string = "") {
         super('path', classes);
         this.element.setAttribute('d', path);
      }
   }
}
