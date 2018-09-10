namespace Utility {
   /** Only safe for JSON friendly objects */
   export function deepCopy<O extends {}>(obj: O): O {
      return JSON.parse(JSON.stringify(obj));
   }
}

