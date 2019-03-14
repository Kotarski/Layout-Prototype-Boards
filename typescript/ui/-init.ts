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
      $(document).keydown(e => {
         if (e.ctrlKey) {
            if (e.key === "z") {
               Events.undo();
            } else if (e.key === "y") {
               Events.redo();
            }
         }
      });

      // File listeners
      NodeElements.fileInput.addEventListener('change', e => {
         Events.fileInput(e);
      });
      NodeElements.fileSave.addEventListener('click', e => {
         Events.fileSave(e);
      });

      // Schematic Listeners
      NodeElements.schematicEditingEnabled.addEventListener('click', e => {
         const state: boolean = NodeElements.schematicEditingEnabled.checked;
         Events.enableSchematicEditingPress(state)
      });

      // Board Listeners
      NodeElements.makeStripboard.addEventListener('click', e => {
         Events.makeStripBoardButtonPress();
      });
      NodeElements.makeHalfBreadboard.addEventListener('click', e => {
         Events.makeBreadBoardSmallButtonPress();
      });
      NodeElements.makeFullBreadboard.addEventListener('click', e => {
         Events.makeBreadBoardLargeButtonPress();
      });
      NodeElements.boardDraggingEnabled.addEventListener('click', e => {
         const state: boolean = NodeElements.boardDraggingEnabled.checked;
         Events.enableBoardDraggingPress(state);
      });

      // Check listeners
      NodeElements.checkCircuitButton.addEventListener('click', e => {
         Events.checkCircuit()
      });
   }
}
export default Ui;