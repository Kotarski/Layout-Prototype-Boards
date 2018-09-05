namespace Svg.Element.Group.Led.Layout {
   export type type = ReturnType<typeof make>;
   export function make(value: number, color: string, start: Vector, end: Vector, classes: string = "") {
      const bodyGroup = Group.make(classes);

      let centre = vector(start, end).centre().vector;
      let rotation = vector(start).getAngleTo(end);


      let bodyString =
         "M " + (6) + " " + (10.5) +
         "a " + (12) + " " + (12) + " " + (0) + " " + (1) + " " + (0) + " " + (-12) + " " + (0) +
         "Z";

      let highlightString =
         "M " + (6) + " " + (11.5) +
         "a " + (12.8) + " " + (12.8) + " " + (0) + " " + (1) + " " + (0) + " " + (-12) + " " + (0) +
         "Z";

      let edge = Svg.Element.Path.make(bodyString, "edge");
      let middle = Svg.Element.Circle.make({ x: 0, y: 0 }, 10, "centre");

      $([edge.element, middle.element]).css("fill", color);


      bodyGroup.append(
         edge,
         Svg.Element.Path.make(bodyString, "darkener"),
         middle,
         Svg.Element.Circle.make({ x: 0, y: 0 }, 5, "lightener"),
         Svg.Element.Path.make(highlightString, "nofill highlight"),
      );

      // bodyGroup.append(
      //    Svg.Element.Rect.make({ x: -5.5, y: 0 }, { width: 29, height: 15 }, { x: 0, y: 0 }, "body"),
      //    Svg.Element.Rect.make({ x: 17.5, y: 0 }, { width: 5, height: 15 }, { x: 0, y: 0 }, "body"),
      //    Svg.Element.Rect.make({ x: 12, y: 0 }, { width: 6, height: 15 }, { x: 0, y: 0 }, "cathode"),
      //    Svg.Element.Rect.make({ x: 0, y: 0 }, { width: 40, height: 15 }, { x: 1, y: 1 }, "highlight nofill")
      // );

      return [
         Svg.Element.Path.make([start, end], "lead"),
         bodyGroup.translate(centre).rotate(rotation - 90)
      ];
   }
}