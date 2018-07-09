namespace Svg.Elements {
   export class Graphic extends Svg.Element {
      constructor(type: string, classes: string = "") {
         super(type, classes);
      }

      remove() {
         if (this.parent !== undefined) {
            this.parent.visualChildren = this.parent.visualChildren.filter(c => c !== this);
         }
         $(this.element).remove();
      }
   }
}