namespace Svg.Element.Group.Diode.Layout {
   export type type = ReturnType<typeof make>;
   export function make(value: number, start: Vector, end: Vector, classes: string = "") {
      const bodyGroup = Group.make(classes);

      let centre = vector(start, end).centre().vector;
      let rotation = vector(start).getAngleTo(end);

      bodyGroup.append(
         Svg.Element.Rect.make({ x: -5.5, y: 0 }, { width: 29, height: 15 }, { x: 0, y: 0 }, "body"),
         Svg.Element.Rect.make({ x: 17.5, y: 0 }, { width: 5, height: 15 }, { x: 0, y: 0 }, "body"),
         Svg.Element.Rect.make({ x: 12, y: 0 }, { width: 6, height: 15 }, { x: 0, y: 0 }, "cathode"),
         Svg.Element.Rect.make({ x: 0, y: 0 }, { width: 40, height: 15 }, { x: 1, y: 1 }, "highlight nofill")
      );

      return [
         Svg.Element.Path.make([start, end], "lead"),
         bodyGroup.translate(centre).rotate(rotation)
      ];
   }
}