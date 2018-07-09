namespace Svg {
   export function makeTransform(): SVGTransform {
      let svgns: string = Constants.svgURI;
      const svgElement = document.createElementNS(svgns, "svg") as SVGSVGElement
      const transform = svgElement.createSVGTransform();
      return transform;
   }
}
