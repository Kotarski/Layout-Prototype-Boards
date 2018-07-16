namespace Svg {
   export function makePoint(vector: Global.Types.vector): SVGPoint {
      const point = makeSVGElement<SVGSVGElement>("svg").createSVGPoint();
      point.x = vector.X;
      point.y = vector.Y;
      return point;
   }



}
