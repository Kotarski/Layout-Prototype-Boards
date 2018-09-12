namespace Utility {
   export const flatten2d = <T>(array: T[][]): T[] => [].concat.apply([], array);
   export const flatten3d = <T>(array: T[][][]): T[] => flatten2d(flatten2d(array));
}