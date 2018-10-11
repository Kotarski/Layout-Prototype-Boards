namespace Circuit.Component._Bipolar {
   export function drawLayout(instance: Classes.Layout) {
      const bodyGroup = Svg.Element.Group.make("body");

      const emitterEnd = instance.joints[INDEXEMITTER];
      const collectorEnd = instance.joints[INDEXCOLLECTOR];
      const baseEnd = instance.joints[INDEXBASE];

      const centre = vector(emitterEnd, collectorEnd, baseEnd).centre().vector;
      const rotation = vector(emitterEnd).getAngleTo(baseEnd);

      const [emitterStart, collectorStart, baseStart]: Vector[] = vector(
         { x: - 12, y: 3 }, { x: 0, y: -2 }, { x: 12, y: 3 }
      ).rotate(rotation).sumWith(centre).vectors;

      const joints = [
         [emitterStart, emitterEnd],
         [collectorStart, collectorEnd],
         [baseStart, baseEnd],
      ]

      const semiCircleString =
         "M " + (16) + " " + (4) +
         "a " + (1) + " " + (1) + " " + (0) + " " + (0) + " " + (0) + " " + (-32) + " " + (0) +
         "v " + (3) +
         "h " + (32) +
         "v " + (-3) +
         "Z";

      bodyGroup.append(
         Svg.Element.Path.make(semiCircleString, "body highlight"),
         Svg.Element.Text.make(instance.type, { x: 0, y: 4 }, "text")
      );

      return [
         Svg.Element.Path.make(joints, "lead"),
         bodyGroup.translate(centre).rotate(rotation),
         Svg.Element.Path.make(joints, "leadguide")
      ];
   }
}