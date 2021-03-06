//import * as $ from 'jquery';
namespace NodeElements {
   //File
   export let fileInput: HTMLInputElement;
   export let fileSave: HTMLInputElement;
   export let fileStatusText: HTMLParagraphElement;

   //Board Control
   export let stripboardRows: HTMLInputElement;
   export let stripboardColumns: HTMLInputElement;
   export let boardDraggingDisabled: HTMLInputElement;

   //Checking
   export let checkCircuitButton: HTMLInputElement;
   export let checkShowCorrect: HTMLInputElement;
   export let checkShowIncorrect: HTMLInputElement;
   export let checkStatusText: HTMLParagraphElement;

   //Svg Containers
   export let layoutContainer: HTMLDivElement;
   export let schematicContainer: HTMLDivElement;

   export function init() {
      //File
      NodeElements.fileInput = $("input#fileInput")[0] as HTMLInputElement;
      NodeElements.fileSave = $("input#fileSave")[0] as HTMLInputElement;
      NodeElements.fileStatusText = $("p#fileStatusText")[0] as HTMLParagraphElement;

      //Board Control
      NodeElements.stripboardRows = $("input#stripboardRows")[0] as HTMLInputElement;
      NodeElements.stripboardColumns = $("input#stripboardColumns")[0] as HTMLInputElement;
      NodeElements.boardDraggingDisabled = $("input#boardDraggingDisabled")[0] as HTMLInputElement;

      //Checking
      NodeElements.checkCircuitButton = $("input#checkCircuitButton")[0] as HTMLInputElement;
      NodeElements.checkShowCorrect = $("input#checkShowCorrect")[0] as HTMLInputElement;
      NodeElements.checkShowIncorrect = $("input#checkShowIncorrect")[0] as HTMLInputElement;
      NodeElements.checkStatusText = $("p#checkStatusText")[0] as HTMLParagraphElement;

      //Svg Containers
      NodeElements.layoutContainer = $("div#layoutContainer")[0] as HTMLDivElement;
      NodeElements.schematicContainer = $("div#schematicContainer")[0] as HTMLDivElement;
   }
}
export default NodeElements
