namespace Svg.Element.Group.CapacitorBodyCeramic {
   export type type = ReturnType<typeof make>;
   export function make(
      value: number,
      start: Vector,
      end: Vector,
      classes: string = ""
   ) {
      const element = Group.make(classes);

      let centre = {
         x: (start.x + end.x) / 2,
         y: (start.y + end.y) / 2
      };

      let rotation = vector(start).getAngleTo(end);

      const text = Utility.getStandardForm(value, 'F');

      element.append(
         Svg.Element.Ellipse.make({ x: 0, y: 0 }, { x: 16, y: 8 }, "body highlight nofill"),
         Svg.Element.Text.make(text, { x: 0, y: 0 }, "text")
      );

      element.translate({ x: centre.x, y: centre.y }).rotate(rotation);

      return element;
   }
}
