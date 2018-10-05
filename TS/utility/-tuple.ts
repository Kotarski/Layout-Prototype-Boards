namespace Utility {
   /** Restructures inputs as a Tuple */
   export function tuple<TS extends any[]>(...args: TS) {
      return args;
   }
}