namespace Circuit.Component._Diode {
   export function drawLayout(instance: Classes.Layout) {
      const bodyGroup = Svg.Element.Group.make("body");

      const cathodeEnd = instance.joints[INDEXCATHODE];
      const anodeEnd = instance.joints[INDEXANODE];

      const centre = vector(cathodeEnd, anodeEnd).centre().vector;
      const rotation = vector(cathodeEnd).getAngleTo(anodeEnd);

      if (instance.color === "N/A") {
         bodyGroup.append(
            Svg.Element.Rect.make({ x: -5.5, y: 0 }, { width: 29, height: 15 }, { x: 0, y: 0 }, "body"),
            Svg.Element.Rect.make({ x: 17.5, y: 0 }, { width: 5, height: 15 }, { x: 0, y: 0 }, "body"),
            Svg.Element.Rect.make({ x: 12, y: 0 }, { width: 6, height: 15 }, { x: 0, y: 0 }, "cathode"),
            Svg.Element.Rect.make({ x: 0, y: 0 }, { width: 40, height: 15 }, { x: 1, y: 1 }, "highlight nofill")
         );
      } else {
         $(bodyGroup.element).addClass("led");

         const bodyString =
            "M " + (10) + " " + (15) +
            "a " + (18) + " " + (18) + " " + (0) + " " + (1) + " " + (0) + " " + (-20) + " " + (0) +
            "Z";

         const highlightString =
            "M " + (10) + " " + (16) +
            "a " + (18.8) + " " + (18.8) + " " + (0) + " " + (1) + " " + (0) + " " + (-20) + " " + (0) +
            "Z";

         const edge = Svg.Element.Path.make(bodyString, "edge");
         const middle = Svg.Element.Circle.make({ x: 0, y: 0 }, 14, "centre");

         $([edge.element, middle.element]).css("fill", instance.color);


         bodyGroup.append(
            edge,
            Svg.Element.Path.make(bodyString, "darkener"),
            middle,
            Svg.Element.Circle.make({ x: 0, y: 0 }, 8, "lightener"),
            Svg.Element.Path.make(highlightString, "nofill highlight"),
         ).rotate(-90);
      }

      return [
         Svg.Element.Path.make([cathodeEnd, anodeEnd], "lead"),
         bodyGroup.translate(centre).rotate(rotation)
      ];
   }
}