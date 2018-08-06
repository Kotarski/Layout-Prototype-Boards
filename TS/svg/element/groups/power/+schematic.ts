namespace Svg.Element.Group.Power.Schematic {
   export type type = ReturnType<typeof make>;
   export function make(voltage: number, connection: Vector, classes: string = "") {
      const bodyGroup = Group.make(classes);

      if (voltage < 0) {
         bodyGroup.append(powerNegativeGraphics(voltage));
      } else if (voltage > 0) {
         bodyGroup.append(powerPositiveGraphics(voltage));
      } else {
         bodyGroup.append(powerGroundGraphics());
      }

      return [
         bodyGroup.translate(connection)
      ];
   }
}

function powerNegativeGraphics(voltage: number) {
   let text = Utility.getStandardForm(voltage, "V")
   return [
      Svg.Element.Rect.make({ x: 0, y: 8 }, { width: 40, height: 20 }, { x: 2, y: 2 }, "highlight highlightwithfill extrathick"),
      Svg.Element.Line.make({ x: -12, y: 5 }, { x: 12, y: 5 }, "line medium"),
      Svg.Element.Text.make(text, { x: 0, y: 17 }, "text bold"),
      Svg.Element.Line.make({ x: 0, y: 5 }, { x: 0, y: -10 }, "line thin")
   ]
}

function powerPositiveGraphics(voltage: number) {
   let text = Utility.getStandardForm(voltage, "V")
   return [
      Svg.Element.Rect.make({ x: 0, y: -8 }, { width: 40, height: 20 }, { x: 2, y: 2 }, "highlight highlightwithfill extrathick"),
      Svg.Element.Line.make({ x: -12, y: -5 }, { x: 12, y: -5 }, "line medium"),
      Svg.Element.Text.make(text, { x: 0, y: -7 }, "text bold"),
      Svg.Element.Line.make({ x: 0, y: -5 }, { x: 0, y: 10 }, "line thin")
   ];
}

function powerGroundGraphics() {
   return [
      Svg.Element.Rect.make({ x: 0, y: 5 }, { width: 40, height: 20 }, { x: 2, y: 2 }, "highlight highlightwithfill extrathick"),
      Svg.Element.Line.make({ x: -18, y: 0 }, { x: 18, y: 0 }, "line medium"),
      Svg.Element.Line.make({ x: -12, y: 5 }, { x: 12, y: 5 }, "line medium"),
      Svg.Element.Line.make({ x: -6, y: 10 }, { x: 6, y: 10 }, "line medium"),
      Svg.Element.Line.make({ x: 0, y: 0 }, { x: 0, y: -10 }, "line thin")
   ]
}