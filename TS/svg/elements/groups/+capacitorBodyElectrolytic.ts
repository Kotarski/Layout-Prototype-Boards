namespace Svg.Elements.Groups {
   export class CapacitorBodyElectrolytic extends Svg.Elements.Group {
      constructor(value: number, betweenStart: Global.Types.vector, betweenEnd: Global.Types.vector, classes: string = "") {
         super(classes);

         const centre = {
            X: (betweenStart.X + betweenEnd.X) / 2,
            Y: (betweenStart.Y + betweenEnd.Y) / 2
         };

         const rotation =
            Math.atan2(centre.Y - betweenStart.Y, centre.X - betweenStart.X) *
            180 /
            Math.PI;

         const text = Utility.getStandardForm(value, 'F');

         const bodyArcEndPoint = 14 / Math.SQRT2;
         const textArcEndPoint = 12.5 / Math.SQRT2;
         const bodyPathString = "m14 0 A14 14 0 1 0 " + (bodyArcEndPoint) + " " + (bodyArcEndPoint);
         const minusPathString = "m14 0 A14 14 0 0 1 " + (bodyArcEndPoint) + " " + (bodyArcEndPoint);
         const pathForTextString = "m" + (textArcEndPoint) + " " + (textArcEndPoint) + "A12.5 12.5 0 1 1 12.5 0";

         this.append([
            new Svg.Elements.Circle({ X: 0, Y: 0 }, 16, "highlight nofill"),
            new Svg.Elements.Path(bodyPathString, "body").rotate(157.5),
            new Svg.Elements.Path(minusPathString, "minus").rotate(157.5),
            new Svg.Elements.Text(text, { X: 1, Y: 0 }, "text").followPath(pathForTextString).rotate(157.5)
         ]);

         this.translate({ X: centre.X, Y: centre.Y }).rotate(rotation);
      }
   }
}