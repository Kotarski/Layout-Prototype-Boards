namespace Circuit.Component._Resistor {
   export function drawLayout(instance: Classes.Layout) {
      const bodyGroup = Svg.Element.Group.make("body");


      const end1 = instance.joints[INDEXEND1];
      const end2 = instance.joints[INDEXEND2];

      let centre = vector(end1, end2).centre().vector;

      let rotation = vector(end1).getAngleTo(end2);

      let bodyPath = "m-12.5 -6" + "h25" + "c15 -8 15 20 0 12" + "h-25" + "c-15 +8 -15 -20 0 -12" + "Z";

      bodyGroup.append(
         Svg.Element.Path.make(bodyPath, "body"),
         getBands(instance.resistance),
         Svg.Element.Path.make(bodyPath, "highlight nofill")
      );

      return [
         Svg.Element.Path.make([end1, end2], "lead"),
         bodyGroup.translate(centre).rotate(rotation)
      ];
   }

   function getBands(num: number) {
      // We don't need a value field
      let exp = num.toExponential(1);

      let sigFig1 = exp.slice(exp.indexOf(".") - 1)[0];
      let sigFig2 = exp.slice(exp.indexOf(".") + 1)[0];
      let multiplier = (
         parseInt(exp.slice(exp.indexOf("e") + 1), 10) - 1
      ).toString();

      // console.log(exp, sigFig1, sigFig2, multiplier);

      let colours: {
         [number: string]: string
      } = {
         "-3": "pink",
         "-2": "silver",
         "-1": "gold",
         "0": "black",
         "1": "brown",
         "2": "red",
         "3": "#FF7F26", //Orange
         "4": "yellow",
         "5": "green",
         "6": "blue",
         "7": "violet",
         "8": "grey",
         "9": "white"
      };

      let b1 = Svg.Element.Rect.make({ x: -17.5, y: 0 }, { width: 3, height: 18 }, undefined, "band1");
      let b2 = Svg.Element.Rect.make({ x: -11, y: 0 }, { width: 3, height: 12 }, undefined, "band2");
      let b3 = Svg.Element.Rect.make({ x: -4, y: 0 }, { width: 3, height: 12 }, undefined, "band3");
      let b4 = Svg.Element.Rect.make({ x: 3.5, y: 0 }, { width: 4, height: 12 }, undefined, "band4");

      $(b1.element).css("fill", colours[sigFig1]);
      $(b2.element).css("fill", colours[sigFig2]);
      $(b3.element).css("fill", colours[multiplier]);
      $(b4.element).css("fill", "transparent");

      return [b1, b2, b3, b4];
   }

}