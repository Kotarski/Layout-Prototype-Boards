import NodeElements from "../~nodeElements";
import Events from "./~events";
namespace Ui {
   export function init() {

      //Maybe
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
            size: "30%",
            minSize: "270",
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
            size: "35%",
            minSize: "5%",
            spacing_open: 10,
            spacing_closed: 10,
            slidable: false,
         }
      });


      $("#welcomeAccordion").accordion({
         collapsible: true,
         heightStyle: "content"
      });




      NodeElements.fileInput.addEventListener('change', (event: Event) => {
         Events.fileInput(event);
      });

      NodeElements.fileSave.addEventListener('click', (event: Event) => {
         Events.fileSave(event);
      });

      NodeElements.checkCircuitButton.addEventListener('click', () => {
         Events.checkCircuit()
      });

      NodeElements.boardDraggingDisabled.addEventListener('click', () => {
         Events.disableBoardDraggingPress()
      });

      $(document).keydown(function (e) {
         if (e.keyCode == 90 && e.ctrlKey) {
            Events.undo();
         }
      });

      $(document).keydown(function (e) {
         if (e.keyCode == 89 && e.ctrlKey) {
            Events.redo();
         }
      });
   }
}
export default Ui;