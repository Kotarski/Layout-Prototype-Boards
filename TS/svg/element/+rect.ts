namespace Svg.Element.Rect {
   export type type = ReturnType<typeof make>;
   export function make(centre: Vector, size: Global.Types.size, cornerRounding: Vector = { x: 0, y: 0 }, classes: string = "") {
      const element: SVGRectElement = Element.make("rect", classes);
      element.setAttribute("x", (centre.x - size.width / 2).toString());
      element.setAttribute("y", (centre.y - size.height / 2).toString());
      element.setAttribute("width", size.width.toString());
      element.setAttribute("height", size.height.toString());
      element.setAttribute("rx", cornerRounding.x.toString());
      element.setAttribute("ry", cornerRounding.y.toString());
      return svg(element);
   }
}
