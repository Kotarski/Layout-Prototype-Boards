namespace Svg {
   export function makeMatrix(): SVGMatrix {
      let svgns: string = Constants.svgURI;
      const svgElement = document.createElementNS(svgns, "svg") as SVGSVGElement
      const matrix = svgElement.createSVGMatrix();
      return matrix;
   }
}
