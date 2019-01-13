import NodeElements from "../~nodeElements";
import Events from "./~events";
//import * as $ from 'jquery';
namespace Ui {
   export function init() {
      $("body").layout({
         center: {
            size: "35%",
            spacing_open: 10,
            spacing_closed: 10,
         },
         west: {
            onresize_end: () => {
               Events.layoutPaneResize();
            },
            onclose: () => {
               Events.layoutPaneResize();
            },
            onopen: () => {
               Events.layoutPaneResize();
            },
            // Override as the external typings are incorrect in this case
            size: "30%" as unknown as number,
            minSize: "270" as unknown as number,
            spacing_open: 10,
            spacing_closed: 10,
            slidable: false,
         },
         east: {
            onresize_end: () => {
               Events.schematicPaneResize();
               Events.layoutPaneResize();
            },
            onclose: () => {
               Events.schematicPaneResize();
               Events.layoutPaneResize();
            },
            onopen: () => {
               Events.schematicPaneResize();
               Events.layoutPaneResize();
            },
            // Override as the external typings are incorrect in this case
            size: "35%" as unknown as number,
            minSize: "5%" as unknown as number,
            spacing_open: 10,
            spacing_closed: 10,
            slidable: false,
         }
      });


      $("#welcomeAccordion").accordion({
         collapsible: true,
         heightStyle: "content"
      });

      // Control Listeners
      $(document).keydown(function (e) {
         if (e.key === "z" && e.ctrlKey) {
            Events.undo();
         }
      });
      $(document).keydown(function (e) {
         if (e.key === "y" && e.ctrlKey) {
            Events.redo();
         }
      });

      // File listeners
      NodeElements.fileInput.addEventListener('change', (event: Event) => {
         Events.fileInput(event);
      });
      NodeElements.fileSave.addEventListener('click', (event: Event) => {
         Events.fileSave(event);
      });

      // Schematic Listeners
      NodeElements.schematicEditingEnabled.addEventListener('click', () => {
         const state: boolean = NodeElements.schematicEditingEnabled.checked;
         Events.enableSchematicEditingPress(state)
      });

      // Board Listeners
      NodeElements.boardDraggingEnabled.addEventListener('click', (e) => {
         const state: boolean = NodeElements.boardDraggingEnabled.checked;
         Events.enableBoardDraggingPress(state);
      });

      // Check listeners
      NodeElements.checkCircuitButton.addEventListener('click', () => {
         Events.checkCircuit()
      });
   }
}
export default Ui;