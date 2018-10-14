import NodeElements from "../~nodeElements";
import Active from "../~active";
import { handleFileInputEvent } from "../fileIO/load/-handleFileInputEvent";
import handleFileSaveEvent from "../fileIO/save/-handleFileSaveEvent";
import history from "../Circuit/history";
import manifest from "../Circuit/manifest";
import Component from "../Circuit/+component";

namespace Events {
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
      handleFileInputEvent(event);
   }

   export function fileSave(event: Event) {
      handleFileSaveEvent(event);
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
      addBoard(Circuit.Component.breadboard.layoutSmall.make({}));
   }

   export function makeBreadBoardLargeButtonPress() {
      addBoard(Component.breadboard.layoutLarge.make({}));
   }

   function addBoard(board: Component.Instance) {
      if (manifest.activeBoard !== undefined) {
         manifest.removeComponent(manifest.activeBoard);
         manifest.addComponent(manifest.layout, board);
         history.mergeLast();
      } else {
         manifest.addComponent(manifest.layout, board);
      }
      manifest.activeBoard = board;
   }

   export function disableBoardDraggingPress() {
      if (manifest.activeBoard !== undefined) {
         if (NodeElements.boardDraggingDisabled.checked) {
            Component.Addins.Draggable.disable(manifest.activeBoard)
         } else {
            Component.Addins.Draggable.enable(manifest.activeBoard)
         }
      }
   }

   export function checkCircuit() {
      let circuitStatus = manifest.checkAll();


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
      if (history !== undefined) {
         history.undo();
      }
   }

   export function redo() {
      if (history !== undefined) {
         history.redo();
      }
   }
}

export default Events;


