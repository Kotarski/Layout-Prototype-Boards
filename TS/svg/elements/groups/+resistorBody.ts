namespace Svg.Elements.Groups {
   export class ResistorBody extends Svg.Elements.Group {
      constructor(
         betweenStart: Global.Types.vector,
         betweenEnd: Global.Types.vector,
         classes: string = ""
      ) {
         super(classes);

         let centre = {
            X: (betweenStart.X + betweenEnd.X) / 2,
            Y: (betweenStart.Y + betweenEnd.Y) / 2
         };

         let rotation =
            Math.atan2(centre.Y - betweenStart.Y, centre.X - betweenStart.X) *
            180 /
            Math.PI;

         let bodyPath =
            "m-12.5 -6" +
            "h25" +
            "c15 -8 15 20 0 12" +
            "h-25" +
            "c-15 +8 -15 -20 0 -12" +
            "Z";

         this.append(
            new Svg.Elements.Path(bodyPath, "body"),
            new Svg.Elements.Rect({ X: -17.5, Y: 0 }, { width: 3, height: 18 }, undefined, "band1"),
            new Svg.Elements.Rect({ X: -11, Y: 0 }, { width: 3, height: 12 }, undefined, "band2"),
            new Svg.Elements.Rect({ X: -4, Y: 0 }, { width: 3, height: 12 }, undefined, "band3"),
            new Svg.Elements.Rect({ X: 3.5, Y: 0 }, { width: 4, height: 12 }, undefined, "band4"),
            new Svg.Elements.Path(bodyPath, "highlight nofill")
         );

         this.translate({
            X: centre.X,
            Y: centre.Y
         }).rotate(rotation);
      }

      setValue(num: number) {
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

         $(this.element)
            .children(".band1")
            .css("fill", colours[sigFig1]);
         $(this.element)
            .children(".band2")
            .css("fill", colours[sigFig2]);
         $(this.element)
            .children(".band3")
            .css("fill", colours[multiplier]);
         $(this.element)
            .children(".band4")
            .css("fill", "transparent");
         return this;
      }
   }
}