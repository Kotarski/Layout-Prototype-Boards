namespace Circuit.Component._Resistor {
   export function drawSchematic(instance: Classes.Schematic) {
      const bodyGroup = Svg.Element.Group.make("body");


      const end1 = instance.joints[INDEXEND1];
      const end2 = instance.joints[INDEXEND2];

      let centre = vector(end1, end2).centre().vector;
      let rotation = vector(end1).getAngleTo(end2);

      let [start1, start2]: Vector[] = vector(
         { x: -24, y: 0 }, { x: 24, y: 0 }
      ).rotate(rotation).sumWith(centre).vectors;

      //Text
      let text = Utility.getStandardForm(instance.resistance, 'Ω')

      bodyGroup.append(
         Svg.Element.Rect.make(vector(0), { width: 46, height: 18 }, vector(2), "highlight highlightwithfill extrathick"),
         Svg.Element.Rect.make(vector(0), { width: 46, height: 18 }, vector(2), "body white")
      );

      let textEl = Svg.Element.Text.make(text, { x: 0, y: -15 }, "text");

      return [
         Svg.Element.Path.make([[start1, end1], [start2, end2]], "line thin"),
         bodyGroup.translate(centre).rotate(rotation),
         textEl.translate(centre).rotatePosition(rotation),
      ];
   }
}
