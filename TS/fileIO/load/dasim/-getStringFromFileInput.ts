namespace FileIO.Load {

   export function getStringFromFileInput(
      fileInput: HTMLInputElement): JQueryPromise<{}> {

      // Used to queue asynchronous actions which require the output of previous
      // actions
      let deferred = $.Deferred();

      // Create Asynchronous file reader
      let reader = new FileReader;

      let files = fileInput.files;

      // Event called when read started
      reader.onloadstart = function (event) {
         console.debug("Read of %o started with %o", [this.result], [event]);
      };

      // Event called if read aborted (Not expected to ever happen)
      reader.onabort = function (event) {
         console.error("Read of %o aborted with %o", [this.result], [event]);
         // Async action failed, abort queue
         deferred.reject("File read aborted")
      };

      // Event called if error occurs during read
      reader.onerror = function (event) {
         console.error("Read of %o failed with %o", [this.result], [event]);
         // Async action failed, abort queue
         deferred.reject("File could not be read")
      };

      // Event called if read completed successfully
      reader.onload = function (event) {
         console.info("Read of %o successfully complete with %o", [this.result], [event]);
         let fileString: string = reader.result as string; //TODO
         if (files && files[0]) {
            deferred.resolve(files[0], fileString)
         } else {
            // Async action failed, abort queue
            deferred.reject("File undefined");
         }
      }

      if (files && files[0]) {
         // Catches other errors such as if the file opject is undefined
         try {
            // Retreive file from file input, file input is configured
            // to open a single file only but still returns as array.
            reader.readAsText(files[0]);
         } catch (e) {
            console.error("Read of %o failed with %o", [files[0]], [e]);
            // Async action failed, abort queue
            deferred.reject("File could not be read as string");
         }
      } else {
         // Async action failed, abort queue
         deferred.reject("File undefined");
      }



      // Return promise that async function will eventually finish
      return deferred.promise();
   }
}
