namespace Utility {
   export const isNot = <T>(check: T) => (test: T) => test !== check;
}
