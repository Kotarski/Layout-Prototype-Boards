namespace Svg.Elements.Groups {
   export class dip extends Svg.Elements.Group {
      //parent: Group;
      //digits: SimpleGraphic[][] = [];
      constructor(
         pinsPerSide: number = 4,
         textLineOne: string = "",
         textLineTwo: string = "",
         textLineThree: string = "",
         classes: string = "") {
         super(classes);
         $(this.element).addClass("dip", classes);

         let gridSpacing = Constants.gridSpacing;

         let bodySize = {
            width: gridSpacing * pinsPerSide,
            height: gridSpacing * 2.8
         }

         let centre = {
            X: gridSpacing * (pinsPerSide - 1) / 2,
            Y: gridSpacing * 1.5
         };

         let pinString =
            "M " + (0) + " " + (-2.5)
            + "h " + (-4)
            + "v " + (3)
            + "l " + (1) + " " + (0.5)
            + "h " + (6)
            + "l " + (1) + " " + (-0.5)
            + "v " + (-3)
            + "Z";

         // let pinXBase = 0;
         for (let i = 0; i < pinsPerSide; i++) {
            this.append(
               new Svg.Elements.Path(
                  pinString, "pin"
               ).scale({ X: 1, Y: -1 }).translate({ X: gridSpacing * i, Y: 0 }),
               new Svg.Elements.Path(
                  pinString, "pin"
               ).translate({ X: gridSpacing * i, Y: 3 * gridSpacing })
            );
         };

         let notchString =
            "M " + (-0.5 * gridSpacing) + " " + (centre.Y) +
            "v " + (8) +
            "a " + (1) + " " + (1) + " " + (0) + " " + (0) + " " + (0) + " " + (0) + " " + (-16) +
            "Z";

         this.append(
            new Svg.Elements.Rect(centre, bodySize, { X: 5, Y: 5 }, "body"),
            new Svg.Elements.Path(notchString, "notch"),
            new Svg.Elements.Rect(centre, bodySize, { X: 5, Y: 5 }, "body highlight"),
            new Svg.Elements.Text(textLineOne, { X: 0.25 * gridSpacing, Y: 1 * gridSpacing }, "text"),
            new Svg.Elements.Text(textLineTwo, { X: 0.25 * gridSpacing, Y: 1.75 * gridSpacing }, "text"),
            new Svg.Elements.Text(textLineThree, { X: 0.25 * gridSpacing, Y: 2.5 * gridSpacing }, "text")
         );
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