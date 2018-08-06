namespace Svg.Element.Group.Diode.Schematic {
   export type type = ReturnType<typeof make>;
   export function make(breakdownVoltage: number, saturationCurrent: number, end1: Vector, end2: Vector, classes: string = "") {
      const bodyGroup = Group.make(classes);

      let centre = vector(end1, end2).centre().vector;
      let rotation = vector(end1).getAngleTo(end2);

      let [start1, start2]: Vector[] = vector(
         { x: -12, y: 0 }, { x: 12, y: 0 }
      ).rotate(-rotation).sumWith(centre).vectors;

      //Text
      let text = (breakdownVoltage < 51)
         ? Utility.getStandardForm(breakdownVoltage, 'V')
         : Utility.getStandardForm(saturationCurrent, 'A');

      let bodyPath = 'M 12 0 L -12 12 L -12 -12 L 12 0 Z';
      bodyGroup.append(
         Svg.Element.Path.make(bodyPath, "body highlight highlightwithfill extrathick"),
         Svg.Element.Path.make(bodyPath, "body black")
      );

      if (breakdownVoltage < 51) {
         bodyGroup.append(Svg.Element.Path.make('M 18 -12 L 12 -12 L 12 12 L 6 12', "line medium"));
      } else {
         bodyGroup.append(Svg.Element.Path.make('M 12 -12 L 12 12', "line medium"));
      }

      let textEl = Svg.Element.Text.make(text, { x: 0, y: -15 }, "text");

      return [
         Svg.Element.Path.make([[start1, end1], [start2, end2]], "line thin"),
         bodyGroup.translate(centre).rotate(rotation),
         textEl.translate(centre).rotatePosition(rotation),
      ];
   }
}

