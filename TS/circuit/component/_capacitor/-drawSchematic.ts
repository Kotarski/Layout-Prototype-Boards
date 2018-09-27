namespace Circuit.Component._Capacitor {
   export function drawSchematic(instance: Classes.Schematic) {
      const bodyGroup = Svg.Element.Group.make("body");

      const cathodeEnd = instance.joints[INDEXCATHODE];
      const anodeEnd = instance.joints[INDEXANODE];

      let centre = vector(cathodeEnd, anodeEnd).centre().vector;
      let rotation = vector(cathodeEnd).getAngleTo(anodeEnd);

      let [cathodeStart, anodeStart]: Vector[] = vector(
         { x: -6, y: 0 }, { x: 6, y: 0 }
      ).rotate(rotation).sumWith(centre).vectors;

      //Text
      let text = Utility.getStandardForm(instance.capacitance, 'F')

      bodyGroup.append(
         Svg.Element.Rect.make(vector(0), { width: 15, height: 30 }, vector(2), "highlight highlightwithfill extrathick"),
         Svg.Element.Line.make({ x: -4, y: -15 }, { x: -4, y: +15 }, "line thick nocap"),
         Svg.Element.Line.make({ x: +4, y: -15 }, { x: +4, y: +15 }, "line thick nocap"),
      );

      if (instance.isPolarised) {
         bodyGroup.append(Svg.Element.Path.make([
            [{ x: +15, y: -10 }, { x: +7, y: -10 }],
            [{ x: +11, y: -6 }, { x: +11, y: -14 }]
         ], "line thin"));
      }

      return [
         Svg.Element.Path.make([[cathodeStart, cathodeEnd], [anodeStart, anodeEnd]], "line thin"),
         bodyGroup.translate(centre).rotate(rotation),
         Svg.Element.Text.make(text, { x: 0, y: -20 }, "text").translate(centre).rotatePosition(rotation)
      ];
   }
}
