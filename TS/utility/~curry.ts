namespace Utility.Curry {

   export function makeOptional<AT, BT, RT>(
      fn: (A: AT, B: BT) => RT
   ) {
      function curried(A: AT): (B: BT) => RT;
      function curried(A: AT, B: BT): RT;
      function curried(A: AT, B?: BT) {
         if (B !== undefined) {
            return fn(A, B);
         } else {
            return (B: BT) => fn(A, B);
         }
      }
      return curried;
   }

}

