namespace FileIO.Load.Dasim {

   export function filterInvalidComponents(circuitObjects: any[]): JQueryPromise<{}> {
      // Allow caller to see when function completes
      let deferred = $.Deferred();

      // List of components from circuit objects that can be drawn
      let validComponents: object[] = [];

      // List of objects that can be removed
      let knownInvalidComponents: object[] = [];

      // List of components from circuit objects that can't be drawn
      let unknownInvalidComponents: object[] = [];

      // Iterate through each circuit object
      for (let circuitObject of circuitObjects) {

         // If object does not have property 'func' (as all should)
         if (!("func" in circuitObject)) {
            // Reject as there is a file format issue
            console.error("Object %o format is incorrect", [circuitObject]);
            deferred.reject("Object format is incorrect");
         }

         // If object is in the supportedComponentList
         if (Circuit.mappings.getComponentMap(circuitObject.func)) {
            // Add to drawableComponents
            validComponents.push(circuitObject);
         }
         // If object is not supported but can be safely discarded
         else if (discardableObjects.some(dO => dO === circuitObject.func)) {
            // We know its ok to remove and the user did not expect it to be drawn
            knownInvalidComponents.push(circuitObject)
         } else {
            // If object is not in either list then user will expect it to be drawn
            // and needs to be notified that it is not supported
            unknownInvalidComponents.push(circuitObject);
         }
      }

      if (knownInvalidComponents.length) {
         console.debug("Sim objects %o have been safely removed", [knownInvalidComponents])
      }

      if (unknownInvalidComponents.length) {
         console.warn("Components %o are either not supported or not valid", [unknownInvalidComponents]);
      }

      console.info("Components %o successfully retrieved", [validComponents]);
      deferred.resolve(validComponents);

      // Allow caller to see when function completes
      return deferred.promise();
   }

   // List of expected but safely ignorable objects
   const discardableObjects = [
      "setSimMode",
      "setGraphicsControls",
      "setDrawingControls",
   ];

}