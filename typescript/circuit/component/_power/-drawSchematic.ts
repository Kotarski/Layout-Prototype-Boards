namespace Circuit.Component._Power {
   export function drawSchematic(instance: Classes.Schematic) {
      const bodyGroup = Svg.Element.Group.make("body");

      if (instance.voltage < 0) {
         bodyGroup.append(powerNegativeGraphics(instance.voltage));
      } else if (instance.voltage > 0) {
         bodyGroup.append(powerPositiveGraphics(instance.voltage));
      } else {
         bodyGroup.append(powerGroundGraphics());
      }

      return [
         bodyGroup.translate(instance.joints[INDEXCONNECTION])
      ];
   }

   function powerNegativeGraphics(voltage: number) {
      const text = Utility.getStandardForm(voltage, "V")
      return [
         Svg.Element.Rect.make({ x: 0, y: 18 }, { width: 40, height: 20 }, { x: 2, y: 2 }, "highlight highlightwithfill extrathick"),
         Svg.Element.Line.make({ x: -12, y: 15 }, { x: 12, y: 15 }, "line medium"),
         Svg.Element.Text.make(text, { x: 0, y: 27 }, "text bold"),
         Svg.Element.Line.make({ x: 0, y: 15 }, { x: 0, y: 0 }, "line thin")
      ]
   }

   function powerPositiveGraphics(voltage: number) {
      const text = Utility.getStandardForm(voltage, "V")
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
}
