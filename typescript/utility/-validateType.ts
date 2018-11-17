import is from "./-is";
import * as GlobalTypes from "../++types";

export type checkfunction<T> = (value: unknown, log?: boolean) => T;

type genericValidate<T, OT=T> = (test: T, fallback: OT) => checkfunction<OT>;

// Validate by type checking against base type (string number etc)
type baseValidate<T = GlobalTypes.baseTypes> = genericValidate<T, GlobalTypes.NameType<T>>;

// Validate according to some function
type functionValidate = genericValidate<(value: unknown) => boolean>;

// Validate by checking against predefined array
type selectValidate<T> = genericValidate<T[]>;

export default interface validateType<T> extends baseValidate, functionValidate, selectValidate<T> { };

export default function validateType<T>(test: (GlobalTypes.baseTypes | ((value: unknown) => boolean) | T[]), fallback: T) {
   // Effectively convert all cases into a boolean returning function
   const predicate = ((typeof test === "string")
      ? (v: unknown) => typeof v === test
      : (test instanceof Array)
         ? (v: unknown) => test.some(is(v))
         : test
   );

   const validator: checkfunction<T> = (value, log = false) => {
      if (predicate(value)) {
            /*LOGSTART*/if (log) {
            console.log(`Value '%o' passed test '%o`, value, test);
         }/*LOGEND*/
         return value as T;
      } else {
            /*LOGSTART*/if (log) {
            console.log(`Validation failure, value '%o' did not pass test '%o',
                fallback '%o' used.`, value, test, fallback);
         }/*LOGEND*/
         return fallback;
      }
   }

   return validator;
}



