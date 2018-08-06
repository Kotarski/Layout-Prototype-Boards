namespace Svg.Element.Group.Bipolar.Layout {
   export type type = ReturnType<typeof make>;
   export function make(
      text: string,
      emitterEnd: Vector,
      collectorEnd: Vector,
      baseEnd: Vector,
      classes: string = ""
   ) {
      const bodyGroup = Group.make(classes);

      let centre = vector(emitterEnd, collectorEnd, baseEnd).centre().vector;
      let rotation = vector(emitterEnd).getAngleTo(baseEnd);

      let [emitterStart, collectorStart, baseStart]: Vector[] = vector(
         { x: - 12, y: 3 }, { x: 0, y: 3 }, { x: 12, y: 3 }
      ).rotate(-rotation).sumWith(centre).vectors;

      let joints = [
         [emitterStart, emitterEnd],
         [collectorStart, collectorEnd],
         [baseStart, baseEnd],
      ]

      let semiCircleString =
         "M " + (16) + " " + (4) +
         "a " + (1) + " " + (1) + " " + (0) + " " + (0) + " " + (0) + " " + (-32) + " " + (0) +
         "v " + (3) +
         "h " + (32) +
         "v " + (-3) +
         "Z";

      bodyGroup.append(
         Svg.Element.Path.make(semiCircleString, "body highlight"),
         Svg.Element.Text.make(text, { x: 0, y: 4 }, "text")
      );

      return [
         Svg.Element.Path.make(joints, "lead"),
         bodyGroup.translate(centre).rotate(rotation)
      ];
   }
}