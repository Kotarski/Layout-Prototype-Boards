//TODO FOLDER STRUCTURE

namespace Circuit.Parts {
   export class Diagram {
      // For Self
      root: Svg.Root;
      group: Svg.Elements.Group;

      // Make and draw this
      constructor(node: HTMLDivElement) {
         this.root = new Svg.Root();
         this.group = this.root.group;
         this.root.draw(node);
      }

   }
}