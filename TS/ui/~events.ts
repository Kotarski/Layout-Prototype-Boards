namespace Ui.Events {

   function fitDiagramContents(diagram: Circuit.Parts.Diagram) {
      let rootEl = diagram.root.element.element;
      let group = diagram.group;

      let margin = 3;

      let groupBBox = group.element.getBBox();
      let groupWidth = groupBBox.width + margin * 2;
      let groupHeight = groupBBox.height + margin * 2;

      let scaleX: number = (groupWidth) ? (rootEl.width.baseVal.value / groupWidth) : 0;
      let scaleY: number = (groupHeight) ? (rootEl.height.baseVal.value / groupHeight) : 0;
      let scaleMin: number = Math.min(scaleX, scaleY);

      let offsetX = -groupBBox.x * scaleMin + (rootEl.width.baseVal.value - groupWidth * scaleMin) / 2 + margin;
      let offsetY = (-groupBBox.y * scaleMin) + (rootEl.height.baseVal.value - groupHeight * scaleMin) / 2 + margin;

      let transformString = "translate(" + offsetX + " " + offsetY + ")" + "scale(" + scaleMin + ")";
      group.element.setAttribute('transform', transformString);
   }

   export function schematicPaneResize() {
      window.setTimeout(() => {
         fitDiagramContents(Active.schematic);
      }, 5);
   }

   export function layoutPaneResize() {
      window.setTimeout(() => {
         fitDiagramContents(Active.layout);
      }, 5);
   }

   export function fileInput(event: Event) {
      FileIO.Load.handleFileInputEvent(event);
   }

   export function fileSave(event: Event) {
      FileIO.Save.handleFileSaveEvent(event);
   }

   export function makeStripBoardButtonPress() {
      let rowElement = NodeElements.stripboardRows;
      let columnElement = NodeElements.stripboardColumns;

      let rows = parseInt(rowElement.value);
      let columns = parseInt(columnElement.value);

      if (rows && columns &&
         rows >= parseInt(rowElement.min) && columns >= parseInt(columnElement.min) &&
         rows <= parseInt(rowElement.max) && columns <= parseInt(columnElement.max)
      ) {
         addBoard(Circuit.Component.stripboard.layout.make({
            rows: rows,
            columns: columns
         }));
      }
   }

   export function makeBreadBoardSmallButtonPress() {
      addBoard(Circuit.Component.Breadboard.layoutSmall.make({}));
   }

   export function makeBreadBoardLargeButtonPress() {
      addBoard(Circuit.Component.Breadboard.layoutLarge.make({}));
   }

   function addBoard(board: Circuit.Component.Instance) {
      if (Circuit.manifest.activeBoard !== undefined) {
         Circuit.manifest.removeComponent(Circuit.manifest.activeBoard);
         Circuit.manifest.addComponent(Circuit.manifest.layout, board);
         Circuit.history.mergeLast();
      } else {
         Circuit.manifest.addComponent(Circuit.manifest.layout, board);
      }
      Circuit.manifest.activeBoard = board;
   }

   export function checkCircuit() {
      let circuitStatus = Circuit.manifest.checkAll();


      let doHighlightCorrect = NodeElements.checkShowCorrect.checked;
      let doHighlightIncorrect = NodeElements.checkShowIncorrect.checked;

      const highlightCheck = () => {
         if (doHighlightIncorrect) {
            circuitStatus.incorrects.forEach(incorrect => {
               $(incorrect.group.element).find(".highlight").css("stroke", "red");
               $(incorrect.group.element).find(".highlightwithfill").css("fill", "red");;
            });
         }
         if (doHighlightCorrect) {
            circuitStatus.corrects.forEach(correct => {
               $(correct.group.element).find(".highlight").css("stroke", "green");
               $(correct.group.element).find(".highlightwithfill").css("fill", "green");;
            });
         }
      }

      const clearHighlightCheck = () => {
         if (doHighlightIncorrect) {
            circuitStatus.incorrects.forEach(incorrect => {
               $(incorrect.group.element).find(".highlight").css("stroke", "");
               $(incorrect.group.element).find(".highlightwithfill").css("fill", "");
            });
         }
         if (doHighlightCorrect) {
            circuitStatus.corrects.forEach(correct => {
               $(correct.group.element).find(".highlight").css("stroke", "");
               $(correct.group.element).find(".highlightwithfill").css("fill", "");;
            });
         }
      }

      highlightCheck();
      window.setTimeout(() => {
         clearHighlightCheck();
         window.setTimeout(() => {
            highlightCheck();
            window.setTimeout(() => {
               clearHighlightCheck();
               window.setTimeout(() => {
                  highlightCheck();
                  window.setTimeout(() => {
                     clearHighlightCheck();
                  }, 400);
               }, 200);
            }, 400);
         }, 200);
      }, 400);

      let completion = (circuitStatus.corrects.length / (circuitStatus.corrects.length + circuitStatus.incorrects.length) * 100).toFixed(1);
      NodeElements.checkStatusText.innerText = "Correct: " + completion + "%";
   }

   export function undo() {
      if (Circuit.history !== undefined) {
         Circuit.history.undo();
      }
   }

   export function redo() {
      if (Circuit.history !== undefined) {
         Circuit.history.redo();
      }
   }


}
