namespace Svg {
   export function makePoint(vector: Vector): SVGPoint {
      const point = Element.make<SVGSVGElement>("svg").createSVGPoint();
      point.x = vector.x;
      point.y = vector.y;
      return point;
   }
}
