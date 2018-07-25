namespace Svg.Element.Ellipse {
   export type type = ReturnType<typeof make>;
   export function make(centreVector: Global.Types.vector, radiusVector: Global.Types.vector, classes: string = "") {
      const element: SVGEllipseElement = Element.make("ellipse", classes);
      element.setAttribute("cx", centreVector.x.toString());
      element.setAttribute("cy", centreVector.y.toString());
      element.setAttribute("rx", radiusVector.x.toString());
      element.setAttribute("ry", radiusVector.y.toString());
      return svg(element);
   }
}
