import ValueCheck from "../component/~valueCheck";

export default function loadObjectWithDefaults<T extends {}>(defaulter: ValueCheck.Defaulter<T>, partial: any, log = true): T {
   //TS just needs to trust me here...
   return Object.keys(defaulter).reduce((acc, key) => {

      /*LOGSTART*/ if (log) {
         console.group(key);
      }/*LOGEND*/
      console.log(defaulter, key)

      const defaultFn: ValueCheck.validater<any> = (defaulter as any)[key];
      const partialValue = (partial) ? partial[key] : undefined;
      (acc as any)[key] = defaultFn(partialValue, log)

      /*LOGSTART*/ if (log) {
         console.groupEnd();
      }/*LOGEND*/

      return acc;
   }, {}) as T;
}