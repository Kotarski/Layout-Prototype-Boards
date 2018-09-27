namespace Circuit.Component._Inductor {
   export function drawSchematic(instance: Classes.Schematic) {
      const bodyGroup = Svg.Element.Group.make("body");

      const end1 = instance.joints[0];
      const end2 = instance.joints[1];

      let centre = vector(end1, end2).centre().vector;
      let rotation = vector(end1).getAngleTo(end2);

      let [start1, start2]: Vector[] = vector(
         { x: -20, y: 0 }, { x: 20, y: 0 }
      ).rotate(rotation).sumWith(centre).vectors;

      //Text
      let text = Utility.getStandardForm(instance.inductance, 'H');

      bodyGroup.append(
         Svg.Element.Rect.make({ x: 0, y: -2 }, { width: 40, height: 12 }, vector(2), "highlight highlightwithfill extrathick"),
         Svg.Element.Path.make('M-20 0 q5 -12, 10 0 q5 -12, 10 0 q5 -12, 10 0 q5 -12, 10 0', "line medium")
      );

      let textEl = Svg.Element.Text.make(text, { x: 0, y: -13 }, "text");

      return [
         Svg.Element.Path.make([[start1, end1], [start2, end2]], "line thin"),
         bodyGroup.translate(centre).rotate(rotation),
         textEl.translate(centre).rotatePosition(rotation),
      ];
   }
}
