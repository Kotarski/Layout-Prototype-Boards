import vector, { Vector } from "../-vector";
export default function centre(inVectors: Vector[]) {
   return () => {
      let sum: Vector = { x: 0, y: 0 };
      let count = 0;

      inVectors.forEach(inVector => {
         count += 1;
         sum.x += inVector.x;
         sum.y += inVector.y;
      })

      const mean = {
         x: sum.x / count,
         y: sum.y / count
      }

      return vector(mean)
   }
}



