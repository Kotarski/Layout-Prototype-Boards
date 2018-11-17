import NodeElements from "./~nodeElements";
import Diagram from "./circuit/+diagram";
//import * as $ from 'jquery';
namespace Active {
   export let layout: Diagram;
   export let schematic: Diagram;

   export function init() {
      layout = new Diagram(NodeElements.layoutContainer);
      $(layout.root.group.element).addClass("layout");
      schematic = new Diagram(NodeElements.schematicContainer);
      $(schematic.root.group.element).addClass("schematic");
   }
}
export default Active;