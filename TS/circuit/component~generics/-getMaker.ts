namespace Circuit.Component.Generics {
   export function getMaker<
      C extends Instance,
      P extends ReturnType<C["getProperties"]>,
      S extends ReturnType<C["getState"]>
      >(
         instanceClass: { new(p: P, s: S): C },
         defaultProperties: P,
         defaultState: S,
         initialiser: (component: C) => void) {
      return (
         partialProperties: Global.Types.DeepPartial<P>,
         partialState: Global.Types.DeepPartial<S>,
         printFallbacks: boolean = false
      ): C => {
         const defaultPropertyCopy = JSON.parse(JSON.stringify(defaultProperties));
         const defaultStateCopy = JSON.parse(JSON.stringify(defaultState));
         const properties = loadObjectWithDefaults(defaultPropertyCopy, partialProperties, [defaultProperties.name, "properties"], printFallbacks);
         const state = loadObjectWithDefaults(defaultStateCopy, partialState, [defaultProperties.name, "state"], printFallbacks);
         const component = new instanceClass(properties, state) as C;
         if (initialiser) initialiser(component);
         component.draw();
         component.makeConnectors();
         return component;
      }
   }

   function loadObjectWithDefaults(fallback: any, given: any, runningLocation: string[] = [], printFallbacks: boolean = false) {
      // Check types match
      if (typeof fallback !== typeof given || given === undefined) {
         if (printFallbacks) {
            console.log("Given type for \"%s\" does not match fallback, fallback value %o used.", runningLocation.join("."), fallback);
         }
         // if types are object, check object properties match
      } else if (typeof fallback === "object" && !Array.isArray(fallback)) {
         for (let key in fallback) {
            let newRunningLocation = runningLocation.concat(key);
            if (!given.hasOwnProperty(key)) {
               if (printFallbacks) {
                  console.log("Given does not contain key \"%s\", fallback value %o used.", newRunningLocation.join("."), fallback[key]);
               }
            } else {
               fallback[key] = loadObjectWithDefaults(fallback[key], given[key], newRunningLocation, printFallbacks)
            }
         }
      } else {
         fallback = given;
      }
      return fallback;
   }
}

