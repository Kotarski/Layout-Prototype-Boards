
/** Splits an array by predicate*/
export default function split<T>(A: T[], predicate: (elA: T) => boolean): { passes: T[], fails: T[] } {
   let passes: T[] = [];
   let fails: T[] = [];

   A.forEach(elA => {
      if (predicate(elA)) {
         passes.push(elA);
      } else {
         fails.push(elA);
      }
   })

   return { passes: passes, fails: fails };
}


