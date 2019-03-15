
/**
 * Given some predicate, returns a function that accepts some "predicated function" to be
 * conditionally executed. When the return function is called, the predicate is
 * tested, and the "predicated function" is executed if the predicate returns true 
 * */
export default function functionPredicator(predicate: () => boolean) {
   return <R extends any, args extends any[]>(predicated: (...args: args) => R) =>
      (...args: args) =>
         predicate() ? predicated(...args) : undefined
}
      