namespace Svg.Elements.Graphics.Complexes {
   export class CapacitorBodyElectrolytic extends Graphics.Complex {
      textPath: Svg.Elements.Graphics.Simples.TextPath;
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

         this.element.appendChild(
            new Svg.Elements.Graphics.Simples.Circle({ X: 0, Y: 0 }, 16, "highlight nofill").element
         );

         const bodyArcEndPoint = 14 / Math.SQRT2;

         let bodyPathString = "m14 0 A14 14 0 1 0 " + (bodyArcEndPoint) + " " + (bodyArcEndPoint);
         let bodyPath = new Svg.Elements.Graphics.Simples.Path(bodyPathString, "body").rotate(157.5)
         this.element.appendChild(
            bodyPath.element
         );

         let minusPathString = "m14 0 A14 14 0 0 1 " + (bodyArcEndPoint) + " " + (bodyArcEndPoint);
         let minusPath = new Svg.Elements.Graphics.Simples.Path(minusPathString, "minus").rotate(157.5);
         this.element.appendChild(
            minusPath.element
         );

         const textArcEndPoint = 12.5 / Math.SQRT2;
         let pathForTextString = "m" + (textArcEndPoint) + " " + (textArcEndPoint) + "A12.5 12.5 0 1 1 12.5 0";
         let pathForText = new Svg.Elements.Graphics.Simples.Path(pathForTextString, "hidden").rotate(157.5)
         this.element.appendChild(
            pathForText.element
         );

         let text = new Svg.Elements.Graphics.Simples.Text("", { X: 1, Y: 0 }, false, "text");
         this.element.appendChild(
            text.element
         );
         this.textPath = new Svg.Elements.Graphics.Simples.TextPath(text, pathForText);

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