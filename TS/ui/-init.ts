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
               Ui.Events.layoutPaneResize();
            },
            onclose: () => {
               Ui.Events.layoutPaneResize();
            },
            onopen: () => {
               Ui.Events.layoutPaneResize();
            },
            size: "30%",
            minSize: "256",
            spacing_open: 10,
            spacing_closed: 10,
            slidable: false,
         },
         east: {
            onresize_end: () => {
               Ui.Events.schematicPaneResize();
               Ui.Events.layoutPaneResize();
            },
            onclose: () => {
               Ui.Events.schematicPaneResize();
               Ui.Events.layoutPaneResize();
            },
            onopen: () => {
               Ui.Events.schematicPaneResize();
               Ui.Events.layoutPaneResize();
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
         Ui.Events.fileInput(event);
      });

      NodeElements.fileSave.addEventListener('click', (event: Event) => {
         Ui.Events.fileSave(event);
      });

      NodeElements.checkCircuitButton.addEventListener('click', () => {
         Ui.Events.checkCircuit()
      });

      $(document).keydown(function (e) {
         if (e.keyCode == 90 && e.ctrlKey) {
            Ui.Events.undo();
         }
      });

      $(document).keydown(function (e) {
         if (e.keyCode == 89 && e.ctrlKey) {
            Ui.Events.redo();
         }
      });
   }
}