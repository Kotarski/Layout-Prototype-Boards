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

   export function curry2<AT, BT, RT>(predicate: (A: AT, B: BT) => RT): (A: AT) => (B: BT) => RT {
      return (A: AT) => (B: BT) => predicate(A, B);
   }

   export function curry3<AT, BT, CT, RT>(
      predicate: (A: AT, B: BT, C: CT) => RT
   ): (A: AT) => (B: BT) => (C: CT) => RT {
      return (A: AT) => (B: BT) => (C: CT) => predicate(A, B, C);
   }
}

