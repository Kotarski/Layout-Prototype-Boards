namespace Svg.Element.Path {
   export type type = ReturnType<typeof make>;
   export function make(path: string, classes: string = "") {
      const element: SVGPathElement = Element.make("path", classes);
      element.setAttribute('d', path);
      return svg(element);
   }
}