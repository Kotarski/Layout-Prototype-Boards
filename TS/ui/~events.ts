namespace Ui.Events {

   function fitDiagramContents(diagram: Circuit.Parts.Diagram) {
      // console.log(Active.layout.root, Active.layout.root.group)
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

   //TODO Not my best work
   export function makeStripBoardButtonPress() {

      let rowElement = NodeElements.stripboardRows;
      let columnElement = NodeElements.stripboardColumns;
      let rows = parseInt(rowElement.value);
      let columns = parseInt(columnElement.value);
      if (rows && columns &&
         rows >= parseInt(rowElement.min) && columns >= parseInt(columnElement.min) &&
         rows <= parseInt(rowElement.max) && columns <= parseInt(columnElement.max)
      ) {

         let stripboard = Circuit.Component.Stripboard.makeInstance({
            rows: rows,
            columns: columns,
         }, {
               disabled: true
            });

         if (Circuit.manifest.activeBoard) {
            Circuit.history.add(Circuit.manifest, stripboard, Circuit.manifest.activeBoard)
         } else {
            Circuit.history.add(Circuit.manifest, stripboard)
         }

         Circuit.manifest.addComponent(stripboard, Circuit.manifest.layout);
         if (Circuit.manifest.activeBoard) Circuit.manifest.removeComponent(Circuit.manifest.activeBoard);
         Circuit.manifest.activeBoard = stripboard;
         stripboard.disabled = false;
      }
   }

   export function makeBreadBoardSmallButtonPress() {
      let breadboard = Circuit.Component.BreadboardSmall.makeInstance({}, {
         disabled: true
      });

      if (Circuit.manifest.activeBoard) {
         Circuit.history.add(Circuit.manifest, breadboard, Circuit.manifest.activeBoard)
      } else {
         Circuit.history.add(Circuit.manifest, breadboard)
      }

      Circuit.manifest.addComponent(breadboard, Circuit.manifest.layout);
      if (Circuit.manifest.activeBoard) Circuit.manifest.activeBoard.disabled = true;
      if (Circuit.manifest.activeBoard) Circuit.manifest.removeComponent(Circuit.manifest.activeBoard);
      Circuit.manifest.activeBoard = breadboard;
      breadboard.disabled = false;
   }

   export function makeBreadBoardLargeButtonPress() {
      let breadboard = Circuit.Component.BreadboardLarge.makeInstance({}, {
         disabled: true
      });

      if (Circuit.manifest.activeBoard) {
         Circuit.history.add(Circuit.manifest, breadboard, Circuit.manifest.activeBoard)
      } else {
         Circuit.history.add(Circuit.manifest, breadboard)
      }

      Circuit.manifest.addComponent(breadboard, Circuit.manifest.layout);
      if (Circuit.manifest.activeBoard) Circuit.manifest.removeComponent(Circuit.manifest.activeBoard);
      Circuit.manifest.activeBoard = breadboard;
      breadboard.disabled = false;
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
