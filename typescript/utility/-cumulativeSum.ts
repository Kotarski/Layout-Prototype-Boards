
/** Return value in radians */
export default function cumulativeSum(...values: number[]): number[] {
   return values.reduce((acc, value, idx) => acc.concat(value + acc[idx]), [0]).slice(1);
}


