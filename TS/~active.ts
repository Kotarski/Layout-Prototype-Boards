namespace Active {
   export let layout: Circuit.Parts.Diagram;
   export let schematic: Circuit.Parts.Diagram;

   export function init() {
      layout = new Circuit.Parts.Diagram(NodeElements.layoutContainer);
      $(layout.root.group.element).addClass("layout");
      schematic = new Circuit.Parts.Diagram(NodeElements.schematicContainer);
      $(schematic.root.group.element).addClass("schematic");
   }
}