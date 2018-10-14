export default function is<T>(check: T) {
   return (test: T) => test === check;
}


