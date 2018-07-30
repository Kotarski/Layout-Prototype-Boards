
namespace _vector {
   export function snapToGrid<T extends Vector>(inVector: T) {
      return (grid: Vector = { x: 10, y: 10 }) => {
         return vector({
            x: Math.round(inVector.x / (grid.x)) * (grid.x),
            y: Math.round(inVector.y / (grid.y)) * (grid.y)
         })
      }
   }
}

