export default function isNot<T>(check: T) {
   return (test: T) => test !== check
}
