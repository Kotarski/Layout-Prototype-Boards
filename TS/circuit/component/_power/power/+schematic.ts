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
      Svg.Element.Rect.make({ x: 0, y: 18 }, { width: 40, height: 20 }, { x: 2, y: 2 }, "highlight highlightwithfill extrathick"),
      Svg.Element.Line.make({ x: -12, y: 15 }, { x: 12, y: 15 }, "line medium"),
      Svg.Element.Text.make(text, { x: 0, y: 27 }, "text bold"),
      Svg.Element.Line.make({ x: 0, y: 15 }, { x: 0, y: 0 }, "line thin")
   ]
}

function powerPositiveGraphics(voltage: number) {
   let text = Utility.getStandardForm(voltage, "V")
   return [
      Svg.Element.Rect.make({ x: 0, y: -18 }, { width: 40, height: 20 }, { x: 2, y: 2 }, "highlight highlightwithfill extrathick"),
      Svg.Element.Line.make({ x: -12, y: -15 }, { x: 12, y: -15 }, "line medium"),
      Svg.Element.Text.make(text, { x: 0, y: -17 }, "text bold"),
      Svg.Element.Line.make({ x: 0, y: -15 }, { x: 0, y: 0 }, "line thin")
   ];
}

function powerGroundGraphics() {
   return [
      Svg.Element.Rect.make({ x: 0, y: 15 }, { width: 40, height: 20 }, { x: 2, y: 2 }, "highlight highlightwithfill extrathick"),
      Svg.Element.Line.make({ x: -18, y: 10 }, { x: 18, y: 10 }, "line medium"),
      Svg.Element.Line.make({ x: -12, y: 15 }, { x: 12, y: 15 }, "line medium"),
      Svg.Element.Line.make({ x: -6, y: 20 }, { x: 6, y: 20 }, "line medium"),
      Svg.Element.Line.make({ x: 0, y: 10 }, { x: 0, y: 0 }, "line thin")
   ]
}