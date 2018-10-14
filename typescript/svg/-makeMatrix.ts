namespace Svg {
   export function makeMatrix(): SVGMatrix {
      return Element.make<SVGSVGElement>("svg").createSVGMatrix();
   }
}
