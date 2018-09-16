/// <reference path="../Utility/-is.ts" />
namespace Utility {

   export type checkfunction<T> = (value: unknown, log?: boolean) => T;

   type genericValidate<T, OT=T> = (test: T, fallback: OT) => checkfunction<OT>;

   // Validate by type checking against base type (string number etc)
   type baseValidate<T = Global.Types.baseTypes> = genericValidate<T, Global.Types.NameType<T>>;

   // Validate according to some function
   type functionValidate = genericValidate<(value: unknown) => boolean>;

   // Validate by checking against predefined array
   type selectValidate<T> = genericValidate<T[]>;

   export interface validateType<T> extends baseValidate, functionValidate, selectValidate<T> { };

   export function validateType<T>(test: (Global.Types.baseTypes | ((value: unknown) => boolean) | T[]), fallback: T) {
      // Effectively convert all cases into a boolean returning function
      const predicate = ((typeof test === "string")
         ? (v: unknown) => typeof v === test
         : (test instanceof Array)
            ? (v: unknown) => test.some(Utility.is(v))
            : test
      );

      const validator: checkfunction<T> = (value, log = true) => {
         if (predicate(value)) {
            return value as T;
         } else {
            if (log) {
               console.log(`Validation failure, value '%o' did not pass test '%o',
                fallback '%o' used.`, value, test, fallback);
            }
            return fallback;
         }
      }

      return validator;
   }
}
