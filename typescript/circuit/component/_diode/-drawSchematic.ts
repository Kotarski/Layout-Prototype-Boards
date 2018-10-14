namespace Circuit.Component._Diode {
   export function drawSchematic(instance: Classes.Schematic) {
      const bodyGroup = Svg.Element.Group.make("body");

      const cathodeEnd = instance.joints[INDEXCATHODE];
      const anodeEnd = instance.joints[INDEXANODE];

      const centre = vector(cathodeEnd, anodeEnd).centre().vector;
      const rotation = vector(cathodeEnd).getAngleTo(anodeEnd);

      let [cathodeStart, anodeStart]: Vector[] = vector(
         { x: -12, y: 0 }, { x: 12, y: 0 }
      ).rotate(rotation).sumWith(centre).vectors;

      //Text
      let text = (instance.breakdownVoltage < 51)
         ? Utility.getStandardForm(instance.breakdownVoltage, 'V')
         : Utility.getStandardForm(instance.saturationCurrent, 'A');

      const bodyPath = 'M 12 0 L -12 12 L -12 -12 L 12 0 Z';
      bodyGroup.append(
         Svg.Element.Path.make(bodyPath, "body highlight highlightwithfill extrathick"),
         Svg.Element.Path.make(bodyPath, "body black")
      );

      if (instance.color === "N/A") {
         // Standard Diode
         if (instance.breakdownVoltage < 51) {
            bodyGroup.append(Svg.Element.Path.make('M 18 -12 L 12 -12 L 12 12 L 6 12', "line medium"));
         } else {
            bodyGroup.append(Svg.Element.Path.make('M 12 -12 L 12 12', "line medium"));
         }
      } else {
         // LED
         const arrowJointsBase = vector([{ x: 0, y: 3 }, { x: -4, y: 0 }, { x: 0, y: -3 }, { x: -4, y: 0 }, { x: 8, y: 0 }]);
         const arrowJoints1 = arrowJointsBase.sumWith({ x: -16, y: -10 }).rotate(-116.43).vectors;
         const arrowJoints2 = arrowJointsBase.sumWith({ x: -16, y: 0 }).rotate(-116.43).vectors;
         const colorCircle = Svg.Element.Circle.make({ x: -4, y: 0 }, 4, "line thin");

         $(colorCircle.element).css("fill", instance.color);
         $(colorCircle.element).css("stroke", instance.color);

         bodyGroup.append(
            Svg.Element.Path.make(arrowJoints1, "line black thin"), //Arrow1
            Svg.Element.Path.make(arrowJoints2, "line black thin"), //Arrow2
            colorCircle //Color Indicator
         );
      }

      const textEl = Svg.Element.Text.make(text, { x: 0, y: -15 }, "text");

      return [
         Svg.Element.Path.make([[cathodeStart, cathodeEnd], [anodeStart, anodeEnd]], "line thin"),
         bodyGroup.translate(centre).rotate(rotation),
         textEl.translate(centre).rotatePosition(rotation),
      ];
   }
}
