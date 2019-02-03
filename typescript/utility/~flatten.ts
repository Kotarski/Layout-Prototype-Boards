namespace flatten {
   export const flatten2d = <T>(array: T[][]): T[] => ([] as T[]).concat.apply([], array);
   export const flatten3d = <T>(array: T[][][]): T[] => flatten2d(flatten2d(array));
}

export default flatten;