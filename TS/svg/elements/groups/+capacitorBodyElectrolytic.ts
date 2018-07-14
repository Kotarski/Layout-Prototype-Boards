namespace Svg.Elements.Groups {
   export class CapacitorBodyElectrolytic extends Svg.Elements.Group {
      textPath: Svg.Elements.TextPath;
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

         const bodyArcEndPoint = 14 / Math.SQRT2;
         const textArcEndPoint = 12.5 / Math.SQRT2;
         let bodyPathString = "m14 0 A14 14 0 1 0 " + (bodyArcEndPoint) + " " + (bodyArcEndPoint);
         let minusPathString = "m14 0 A14 14 0 0 1 " + (bodyArcEndPoint) + " " + (bodyArcEndPoint);
         let pathForTextString = "m" + (textArcEndPoint) + " " + (textArcEndPoint) + "A12.5 12.5 0 1 1 12.5 0";
         let pathForText = new Svg.Elements.Path(pathForTextString, "hidden").rotate(157.5)

         let text = new Svg.Elements.Text("", { X: 1, Y: 0 }, false, "text");
         this.textPath = new Svg.Elements.TextPath(text, pathForText);

         this.append([
            new Svg.Elements.Circle({ X: 0, Y: 0 }, 16, "highlight nofill"),
            new Svg.Elements.Path(bodyPathString, "body").rotate(157.5),
            new Svg.Elements.Path(minusPathString, "minus").rotate(157.5),
            text
         ]);

         this.translate({
            X: centre.X,
            Y: centre.Y
         }).rotate(rotation);
      }

      setValue(num: number) {
         $(this.textPath.element).text(Utility.getStandardForm(num, 'F'));
         return this;
      }
   }
}