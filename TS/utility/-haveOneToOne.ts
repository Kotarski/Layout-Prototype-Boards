namespace Utility {
   /** Tests that for every element in array A there is exactly one corresponding element
    * in array B for which the predicate is true when presented with both elements.
    */
   export function haveOneToOne<T extends any>(A: T[], B: T[], predicate: (elA: T, elB: T) => boolean) {
      const isPredicateMatchForAllA: boolean = A.every(elA => {
         let match = B.find(elB => predicate(elA, elB));
         B = B.filter(elB => elB !== match);
         return (match !== undefined);
      });

      const allBMatched: boolean = (B.length === 0);

      return (isPredicateMatchForAllA && allBMatched);
   }
}

