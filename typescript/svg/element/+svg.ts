namespace Svg.Element.SVG {
   export function make(classes: string = "") {
      const element: SVGSVGElement = Element.make("svg", classes);
      return svg(element);
   }
}
