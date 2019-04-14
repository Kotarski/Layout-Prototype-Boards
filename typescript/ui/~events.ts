import NodeElements from "../~nodeElements";
import ControlValues from "../~controlValues";
import Active from "../~active";
import { handleFileInputEvent } from "../fileIO/load/-handleFileInputEvent";
import handleFileSaveEvent from "../fileIO/save/-handleFileSaveEvent";
import history from "../circuit/history";
import manifest from "../circuit/manifest";
import Component from "../circuit/+component";
import Diagram from "../circuit/+diagram";
import StripboardMaps from "../circuit/component/_stripboard/-maps";
import BreadboardMaps from "../circuit/component/_breadboard/-maps";
//import * as $ from 'jquery';

namespace Events {

   // Control (explicit)
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

   // Controls (implicit)
   function fitDiagramContents(diagram: Diagram) {
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

   // File
   export function fileInput(event: Event) {
      handleFileInputEvent(event);
   }
   export function fileSave(event: Event) {
      handleFileSaveEvent(event);
   }

   // Schematic
   export function enableSchematicEditingPress(isChecked: boolean) {
      ControlValues.schematicEditingEnabled = isChecked;
   }

   // Board
   function addBoard(board: Component) {
      if (manifest.states.activeBoard !== undefined) {
         manifest.removeComponent(manifest.states.activeBoard);
         manifest.addComponent(manifest.states.layout, board);
         history.mergeLast();
      } else {
         manifest.addComponent(manifest.states.layout, board);
      }
      manifest.states.activeBoard = board;
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
         addBoard(StripboardMaps.layout.make({
            rows: rows,
            columns: columns
         }));
      }
   }
   export function makeBreadBoardSmallButtonPress() {
      addBoard(BreadboardMaps.layoutSmall.make({}));
   }
   export function makeBreadBoardLargeButtonPress() {
      addBoard(BreadboardMaps.layoutLarge.make({}));
   }
   export function enableBoardDraggingPress(isChecked: boolean) {
      ControlValues.boardDraggingEnabled = isChecked;
   }

   // Check
   export function highlightCorrectComponentsPress(isChecked: boolean) {
      ControlValues.highlightCorrectComponents = isChecked;
   }
   export function highlightIncorrectComponentsPress(isChecked: boolean) {
      ControlValues.highlightIncorrectComponents = isChecked;
   }
   // TODO: Move this
   export function checkCircuit() {
      let circuitStatus = manifest.checkAll();
      const highlightCheck = () => {
         if (ControlValues.highlightIncorrectComponents) {
            circuitStatus.incorrects.forEach(incorrect => {
               $(incorrect.group.element).find(".highlight").css("stroke", "red");
               $(incorrect.group.element).find(".highlightwithfill").css("fill", "red");;
            });
         }
         if (ControlValues.highlightCorrectComponents) {
            circuitStatus.corrects.forEach(correct => {
               $(correct.group.element).find(".highlight").css("stroke", "green");
               $(correct.group.element).find(".highlightwithfill").css("fill", "green");;
            });
         }
      }
      const clearHighlightCheck = () => {
         if (ControlValues.highlightIncorrectComponents) {
            circuitStatus.incorrects.forEach(incorrect => {
               $(incorrect.group.element).find(".highlight").css("stroke", "");
               $(incorrect.group.element).find(".highlightwithfill").css("fill", "");
            });
         }
         if (ControlValues.highlightCorrectComponents) {
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


}

export default Events;


