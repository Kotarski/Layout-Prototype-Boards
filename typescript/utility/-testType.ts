import * as GlobalTypes from "../++types";
import is from "./-is";

export default function testType<T extends GlobalTypes.baseTypes>(type: T): (v: unknown) => v is GlobalTypes.NameType<T>;
export default function testType<T>(predicate: (value: T) => boolean): (v: unknown) => v is T;
export default function testType<T>(type: T[]): (v: unknown) => v is T;
export default function testType<T>(test: GlobalTypes.baseTypes | ((value: unknown) => boolean) | T[]) {

   const predicate = ((typeof test === "string")
      ? (v: unknown) => typeof v === test
      : (test instanceof Array)
         ? (v: unknown) => test.some(is(v))
         : test
   );

   return predicate;
}
