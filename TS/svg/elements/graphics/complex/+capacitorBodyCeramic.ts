namespace Svg.Elements.Graphics.Complexes {
   export class CapacitorBodyCeramic extends Graphics.Complex {
      text: Svg.Elements.Graphics.Simples.Text;
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
            new Svg.Elements.Graphics.Simples.Ellipse({ X: 0, Y: 0 }, { X: 16, Y: 8 }, "body highlight nofill").element
         );

         this.text = new Svg.Elements.Graphics.Simples.Text("", { X: 0, Y: 0 }, false, "text");
         this.element.appendChild(
            this.text.element
         );

         this.translate({
            X: centre.X,
            Y: centre.Y
         }).rotate(rotation);
      }

      setValue(num: number) {
         $(this.text.element).text(Utility.getStandardForm(num, 'F'));
         return this;
      }
   }
}