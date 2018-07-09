namespace Svg {
   export function makePoint(vector: Global.Types.vector): SVGPoint {
      let svgns: string = Constants.svgURI;
      const svgElement = document.createElementNS(svgns, "svg") as SVGSVGElement
      const point = svgElement.createSVGPoint()
      point.x = vector.X;
      point.y = vector.Y;
      return point;
   }



}
