import NodeElements from "../../~nodeElements";
import createFile from "./-createFile";
import { lastFilename } from "../load/-handleFileInputEvent";
export default function handleFileSaveEvent(event: Event) {
   // Create an temporary element to download
   let downloadElement: HTMLAnchorElement = document.createElement('a');

   // Specify encoding and define content
   let fileString = createFile();
   downloadElement.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(fileString));

   // Give the file a name
   if (lastFilename !== undefined) {
      downloadElement.setAttribute('download', lastFilename.split('.').shift() + ".layout");
   } else {
      downloadElement.setAttribute('download', 'filename.layout');
   }


   // Don't display the element
   downloadElement.style.display = 'none';

   document.body.appendChild(downloadElement);

   // Click the element on behalf of the user
   downloadElement.click();

   // Remove the element
   document.body.removeChild(downloadElement);

   // Can't detect if cancel pressed but can detect that save window is opened and closed.
   // This mechanism isn't perfect, but it doesn't need to be.
   $(window).one("blur", () => {
      $(window).one("focus", () => {
         NodeElements.fileStatusText.innerText = "File Saved Successfully";
      });
   });
}