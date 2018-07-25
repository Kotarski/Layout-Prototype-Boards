//TODO FOLDER STRUCTURE

namespace Circuit.Parts {
   export class Diagram {
      // For Self
      root = new Svg.Root();
      group = this.root.group;

      // Make and draw this
      constructor(node: HTMLDivElement) {
         this.root.draw(node);
      }

   }
}