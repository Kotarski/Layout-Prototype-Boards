namespace Svg.Element.Line {
   export type type = ReturnType<typeof make>;
   export function make(startVector: Global.Types.vector, endVector: Global.Types.vector, classes: string = "") {
      const element: SVGLineElement = Element.make("line", classes);
      element.setAttribute("x1", startVector.x.toString());
      element.setAttribute("y1", startVector.y.toString());

      element.setAttribute("x2", endVector.x.toString());
      element.setAttribute("y2", endVector.y.toString());
      return svg(element);
   }
}
