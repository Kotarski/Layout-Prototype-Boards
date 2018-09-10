namespace FileIO.Load {
   export let lastFilename: string | undefined;
   export function handleFileInputEvent(event: Event) {
      let fileInput = event.target as HTMLInputElement;
      if (fileInput.value.length == 0) {
         // User selected to cancel, no action required
      } else {
         // Creates a queue forceing the following functions to occur in order,
         // and pass their output to the next function. This is necessary as some
         // are asynchronous but all require the prevous function to completed.
         // Prevents callback hell.

         // Note that each time '.then(fn)' is written it could be replaced with
         // '.then((args) => fn(args)' which is more explicit but more verbose

         // console.log(event);
         //let fileType = event.target.file
         // if ( ) {
         //
         //
         // } else if ( ) {
         //
         //
         // }

         $.Deferred().resolve(fileInput)
            // Get the file as a string from the fileinput
            // (effectively the output of $.Deferred().resolve(fileInput))
            .then(() => getStringFromFileInput(fileInput))

            // Action changes depending on file type
            .then((file, fileString) => {
               let filename = (file as File).name;
               let fileExtension = filename.split('.').pop();
               lastFilename = filename;

               if (fileExtension === "dasim" || fileExtension === "layout") {
                  $.Deferred().resolve(fileString as string)
                     // Get the circuit from the string (output of above)
                     .then((string) => Dasim.getRawComponentsFromString(string as string))
                     // Get the drawable components only from the circuit (output of above)
                     .then((circuitObjects) => Dasim.filterInvalidComponents(circuitObjects as any[]))
                     // Build components
                     .then((rawComponents) => Dasim.buildComponents(rawComponents as any[]))
                     // Called if any of the functions fail using detail from their context
                     .then((savedManifest) => {
                        NodeElements.fileStatusText.innerText = "File:\r\n\"" + filename + "\"\r\nLoaded Successfully";
                        if (savedManifest) {
                           Circuit.manifest.constructFrom(savedManifest);
                           Circuit.History.init(Circuit.manifest.layout);
                        } else {
                           console.error("savedManifest is undefined");
                        }
                        Ui.Events.schematicPaneResize();
                        Ui.Events.layoutPaneResize();
                        // Circuit.manifest.draw();
                     })
                     // Construct circuit
                     .fail((failText) => {
                        console.warn("Failed to load circuit: ", failText);
                        NodeElements.fileStatusText.innerText = "Failed to load file:\r\n\""
                           + "" + filename + "\"\r\n"
                           + "Error:\r\n\"" +
                           failText + "\"";
                     })
               } else {
                  console.error("Failed to load circuit: Incorrect file extenstion %o", fileExtension)
                  NodeElements.fileStatusText.innerText = "Failed to load file:\r\n\""
                     + "" + filename + "\"\r\n"
                     + "Error:\r\n\"" +
                     "Incorrect file extenstion: \"." + fileExtension + "\"\"";
               }

               //Clear file input
               $(fileInput).val("");
            })

      }
   }
}