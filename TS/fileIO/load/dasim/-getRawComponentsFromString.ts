namespace FileIO.Load.Dasim {

   export function getRawComponentsFromString(
      fileString: string): JQueryPromise<{}> {
      // Used to queue asynchronous actions which require the output of previous
      // actions
      let deferred = $.Deferred();

      // Queues functions where each input is the previous functions output

      // Shortcut to pass fileString into the first function
      $.Deferred().resolve(fileString)
         // Get an array of the strings for each object
         .then(() => getComponentStrings(fileString))
         // Get an array of the objects
         .then((strings) => getCircuitObjects(strings as string[]))
         // Return the array of objects
         .then(deferred.resolve)
         // Pass the failiure back up to calling function
         .fail((failText) => deferred.reject(failText));

      // Allow caller to see when function completes
      return deferred.promise();
   }

   // Internal function to turn the string into an array of object strings
   function getComponentStrings(
      fileString: string): JQueryPromise<{}> {
      // Allow caller to see when function completes
      let deferred = $.Deferred();

      // Failure to parse text into JSON is a common cause of errors
      // catching them prevents failure of the program.
      try {
         let circuitObjectStrings: string[] = [];
         circuitObjectStrings = JSON.parse(fileString.replace("\n", ""));

         // Function complete, return array of strings
         deferred.resolve(circuitObjectStrings)
      } catch (e) {
         // Almost definitely a file format issue
         if (e instanceof SyntaxError)
            console.error("Error in file list format: %o ", [e]);
         // Function failed, return error text
         deferred.reject("Error in file list format")
      }

      // Allow caller to see when function completes
      return deferred.promise();
   }

   // Internal function to turn the string array into circuit objects
   function getCircuitObjects(
      circuitObjectStrings: string[]): JQueryPromise<{}> {
      // Allow caller to see when function completes
      let deferred = $.Deferred();

      // Failure to parse text into JSON is a common cause of errors
      // catching them prevents failure of the program.
      try {
         // Array of circuit objects
         let circuitObjects: object[] = [];

         // Parse each string into an object individually and add to array
         for (let circuitObjectString of circuitObjectStrings) {
            let circuitObject = JSON.parse(circuitObjectString);
            circuitObjects.push(circuitObject);
         }

         // Function complete, return array of objects
         console.info("Circuit objects %o successfully parsed", [circuitObjects])
         deferred.resolve(circuitObjects)

      } catch (e) {
         // Almost definitely a file format issue
         if (e instanceof SyntaxError)
            console.error("Error in file object format: %o", [e]);
         // Function failed, return error text
         deferred.reject("Error in file object format")
      }

      // Allow caller to see when function completes
      return deferred.promise();
   }
}