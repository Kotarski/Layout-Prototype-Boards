namespace Svg {
   export function makeMatrix(): SVGMatrix {
      return makeSVGElement<SVGSVGElement>("svg").createSVGMatrix();
   }
}
