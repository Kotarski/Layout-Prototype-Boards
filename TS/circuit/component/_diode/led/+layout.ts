namespace Svg.Element.Group.Led.Layout {
   export type type = ReturnType<typeof make>;
   export function make(value: number, color: string, start: Vector, end: Vector, classes: string = "") {
      const bodyGroup = Group.make(classes);

      let centre = vector(start, end).centre().vector;
      let rotation = vector(start).getAngleTo(end);


      let bodyString =
         "M " + (10) + " " + (15) +
         "a " + (18) + " " + (18) + " " + (0) + " " + (1) + " " + (0) + " " + (-20) + " " + (0) +
         "Z";

      let highlightString =
         "M " + (10) + " " + (16) +
         "a " + (18.8) + " " + (18.8) + " " + (0) + " " + (1) + " " + (0) + " " + (-20) + " " + (0) +
         "Z";

      let edge = Svg.Element.Path.make(bodyString, "edge");
      let middle = Svg.Element.Circle.make({ x: 0, y: 0 }, 14, "centre");

      $([edge.element, middle.element]).css("fill", color);


      bodyGroup.append(
         edge,
         Svg.Element.Path.make(bodyString, "darkener"),
         middle,
         Svg.Element.Circle.make({ x: 0, y: 0 }, 8, "lightener"),
         Svg.Element.Path.make(highlightString, "nofill highlight"),
      );

      return [
         Svg.Element.Path.make([start, end], "lead"),
         bodyGroup.translate(centre).rotate(rotation - 90)
      ];
   }
}