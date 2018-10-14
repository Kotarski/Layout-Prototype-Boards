
export default function testType<T extends Global.Types.baseTypes>(type: T): (v: unknown) => v is Global.Types.NameType<T>;
export default function testType<T>(predicate: (value: T) => boolean): (v: unknown) => v is T;
export default function testType<T>(type: T[]): (v: unknown) => v is T;
export default function testType<T>(test: Global.Types.baseTypes | ((value: unknown) => boolean) | T[]) {

   const predicate = ((typeof test === "string")
      ? (v: unknown) => typeof v === test
      : (test instanceof Array)
         ? (v: unknown) => test.some(Utility.is(v))
         : test
   );

   return predicate;
}
