//TODO FOLDER STRUCTURE
import Root from "../svg/+root"
import Events from "./events";
export default class Diagram {
   // For Self
   root = new Root();
   group = this.root.group;

   // Make and draw this
   constructor(node: HTMLDivElement) {
      this.root.draw(node);
      $(this.root.element.element).addClass("draggable")
      $(this.root.element.element).on(Events.drag, (e, drag) => {
         if (e.target === this.root.element.element) {
            this.root.group.translate(drag);
         }
      })
   }
}
