namespace Svg.Elements {
   export class Path extends Svg.Element {
      constructor(path: string, classes: string = "") {
         super('path', classes);
         this.element.setAttribute('d', path);
      }
   }
}
