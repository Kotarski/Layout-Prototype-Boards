/** Creates an object from a subset of properties of another object */
export default function pick<T, K extends keyof T>(obj: T, ...keys: K[]): Pick<T, K> {
   return Object.assign({}, ...keys.map(k => ({ [k]: obj[k] })));
}