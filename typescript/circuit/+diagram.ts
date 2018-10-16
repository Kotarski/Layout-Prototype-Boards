//TODO FOLDER STRUCTURE
import Root from "../svg/+root"

export default class Diagram {
   // For Self
   root = new Root();
   group = this.root.group;

   // Make and draw this
   constructor(node: HTMLDivElement) {
      this.root.draw(node);
   }

}
