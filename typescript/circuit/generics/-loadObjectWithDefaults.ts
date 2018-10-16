import ValueCheck from "../component/~valueCheck";

export default function loadObjectWithDefaults<T>(defaulter: ValueCheck.Defaulter<T>, partial: any, log = true): T {
   //TS just needs to trust me here...
   const result: T = Object.keys(defaulter).reduce((acc, key) => {

      /*LOGSTART*/ if (log) {
         console.group(key);
      }/*LOGEND*/

      const defaultFn: ValueCheck.validater<any> = (defaulter as any)[key];
      const partialValue = (partial) ? partial[key] : undefined;
      (acc as any)[key] = defaultFn(partialValue, log)

      /*LOGSTART*/ if (log) {
         console.groupEnd();
      }/*LOGEND*/

      return acc;
   }, {}) as T;

   return result;
}