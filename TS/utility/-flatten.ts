namespace Utility {
   export function flatten2d<T>(array: T[][]): T[] {
      return [].concat.apply([], array);
   }

   export function flatten3d<T>(array: T[][][]): T[] {
      return [].concat.apply([], [].concat.apply([], array));
   }
}
