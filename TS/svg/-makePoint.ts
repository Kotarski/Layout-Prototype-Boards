namespace Svg {
   export function makePoint(vector: Global.Types.vector): SVGPoint {
      const point = Element.make<SVGSVGElement>("svg").createSVGPoint();
      point.x = vector.x;
      point.y = vector.y;
      return point;
   }
}
