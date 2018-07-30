namespace _vector {
   export function rotateS(inVector: Vector) {
      return (angle: number) => {
         return vector(curriedRotate(angle)(inVector));
      }
   }

   export function rotateM(inVectors: Vector[]) {
      return (angle: number) => {
         return vector(inVectors.map(curriedRotate(angle)));
      }
   }

   function curriedRotate(angle: number) {
      const radians = (Math.PI / 180) * angle;
      const cos = Math.cos(radians);
      const sin = Math.sin(radians);
      return (inVector: Vector): Vector => {
         return {
            x: (cos * inVector.x) + (sin * inVector.y),
            y: (cos * inVector.y) - (sin * inVector.x)
         };
      }
   }
}

