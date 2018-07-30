namespace _vector {
   export function centreWith<T extends Vector>(inVector: T) {
      return (...vectors: (Vector | Vector[])[]) => {
         let sum: Vector = { x: 0, y: 0 };
         let count = 0;
         vectors.forEach(vectorSet => {
            let asArray = vectorSet instanceof Array ? vectorSet : [vectorSet]
            asArray.forEach(vector => {
               count += 1;
               sum.x += vector.x;
               sum.y += vector.y;
            });
         })

         const mean = {
            x: sum.x / count,
            y: sum.y / count
         }

         return vector(mean)
      }
   }
}


