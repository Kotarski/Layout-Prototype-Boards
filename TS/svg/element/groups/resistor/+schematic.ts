namespace Svg.Element.Group.Resistor.Schematic {
   export type type = ReturnType<typeof make>;
   export function make(resistance: number, end1: Vector, end2: Vector, classes: string = "") {
      const bodyGroup = Group.make(classes);

      let centre = vector(end1, end2).centre().vector;
      let rotation = vector(end1).getAngleTo(end2);

      let [start1, start2]: Vector[] = vector(
         { x: -24, y: 0 }, { x: 24, y: 0 }
      ).rotate(rotation).sumWith(centre).vectors;

      //Text
      let text = Utility.getStandardForm(resistance, 'Ω')

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

