namespace _vector {
   export function asPolar<T extends Vector>(inVector: T) {
      return (compareVector: Vector, boundary: number = 5) => {
         return {
            radius: Math.sqrt(Math.pow(inVector.x, 2) + Math.pow(inVector.y, 2)),
            angle: Math.atan(inVector.y / inVector.x)
         };
      }
   }
}
