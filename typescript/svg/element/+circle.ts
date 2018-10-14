namespace Svg.Element.Circle {
   export type type = ReturnType<typeof make>;
   export function make(centreVector: Vector, radius: number, classes: string = "") {
      const element: SVGCircleElement = Element.make("circle", classes);
      element.setAttribute("cx", centreVector.x.toString());
      element.setAttribute("cy", centreVector.y.toString());
      element.setAttribute("r", radius.toString());
      return svg(element);
   }
}
