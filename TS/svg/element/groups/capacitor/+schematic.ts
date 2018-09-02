namespace Svg.Element.Group.Capacitor.Schematic {
   export type type = ReturnType<typeof make>;
   export function make(capacitance: number, isPolarised: boolean, end1: Vector, end2: Vector, classes: string = "") {
      const bodyGroup = Group.make(classes);

      let centre = vector(end1, end2).centre().vector;
      let rotation = vector(end1).getAngleTo(end2);

      let [start1, start2]: Vector[] = vector(
         { x: -6, y: 0 }, { x: 6, y: 0 }
      ).rotate(rotation).sumWith(centre).vectors;

      //Text
      let text = Utility.getStandardForm(capacitance, 'F')

      bodyGroup.append(
         Svg.Element.Rect.make(vector(0), { width: 15, height: 30 }, vector(2), "highlight highlightwithfill extrathick"),
         Svg.Element.Line.make({ x: -4, y: -15 }, { x: -4, y: +15 }, "line thick nocap"),
         Svg.Element.Line.make({ x: +4, y: -15 }, { x: +4, y: +15 }, "line thick nocap"),
      );

      if (isPolarised) {
         bodyGroup.append(Svg.Element.Path.make([
            [{ x: +15, y: -10 }, { x: +7, y: -10 }],
            [{ x: +11, y: -6 }, { x: +11, y: -14 }]
         ], "line thin"));
      }

      let textEl = Svg.Element.Text.make(text, { x: 0, y: -20 }, "text");

      return [
         Svg.Element.Path.make([[start1, end1], [start2, end2]], "line thin"),
         bodyGroup.translate(centre).rotate(rotation),
         textEl.translate(centre).rotatePosition(rotation),
      ];
   }
}
