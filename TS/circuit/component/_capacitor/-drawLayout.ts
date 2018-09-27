namespace Circuit.Component._Capacitor {
   export function drawLayout(instance: Classes.Layout) {

      const bodyGroup = Svg.Element.Group.make("body");

      const cathodeEnd = instance.joints[INDEXCATHODE];
      const anodeEnd = instance.joints[INDEXANODE];

      const centre = vector(cathodeEnd, anodeEnd).centre().vector;
      const rotation = vector(cathodeEnd).getAngleTo(anodeEnd);
      const text = Utility.getStandardForm(instance.capacitance, 'F');

      if (instance.isPolarised) {
         // Electrolytic
         $(bodyGroup.element).addClass("electrolytic");

         const bodyArcEndPoint = 14 / Math.SQRT2;
         const textArcEndPoint = 12.5 / Math.SQRT2;
         const bodyPathString = "m14 0 A14 14 0 1 0 " + (bodyArcEndPoint) + " " + (bodyArcEndPoint);
         const minusPathString = "m14 0 A14 14 0 0 1 " + (bodyArcEndPoint) + " " + (bodyArcEndPoint);
         const pathForTextString = "m" + (textArcEndPoint) + " " + (textArcEndPoint) + "A12.5 12.5 0 1 1 12.5 0";

         bodyGroup.append(
            Svg.Element.Circle.make({ x: 0, y: 0 }, 16, "highlight nofill"),
            Svg.Element.Path.make(bodyPathString, "body").rotate(157.5),
            Svg.Element.Path.make(minusPathString, "minus").rotate(157.5),
            Svg.Element.Text.make(text, { x: 1, y: 0 }, "text").followPath(pathForTextString).rotate(157.5)
         );
      } else {
         // Ceramic
         $(bodyGroup.element).addClass("ceramic");

         bodyGroup.append(
            Svg.Element.Ellipse.make({ x: 0, y: 0 }, { x: 16, y: 8 }, "body highlight nofill"),
            Svg.Element.Text.make(text, { x: 0, y: 0 }, "text")
         );
      }

      return [
         Svg.Element.Path.make([cathodeEnd, anodeEnd], "lead"),
         bodyGroup.translate(centre).rotate(rotation)
      ];
   }
}
