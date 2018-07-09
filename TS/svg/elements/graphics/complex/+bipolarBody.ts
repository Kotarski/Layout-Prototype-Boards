namespace Svg.Elements.Graphics.Complexes {
   export class BipolarBody extends Graphics.Complex {
      text: Svg.Elements.Graphics.Simples.Text;
      constructor(
         start: Global.Types.vector,
         middle: Global.Types.vector,
         end: Global.Types.vector,
         classes: string = ""
      ) {
         super(classes);

         let centre = {
            X: (start.X + middle.X + end.X) / 3,
            Y: (start.Y + middle.Y + end.Y) / 3,
         };

         let rotation = Math.atan2(end.Y - start.Y, end.X - start.X) * 180 / Math.PI;

         let semiCircleString =
            "M " + (16) + " " + (4) +
            "a " + (1) + " " + (1) + " " + (0) + " " + (0) + " " + (0) + " " + (-32) + " " + (0) +
            "v " + (3) +
            "h " + (32) +
            "v " + (-3) +
            "Z";

         this.element.appendChild(
            new Svg.Elements.Graphics.Simples.Path(semiCircleString, "body highlight").element
         );
         this.text = new Svg.Elements.Graphics.Simples.Text("", { X: 0, Y: 4 }, false, "text");
         this.element.appendChild(
            this.text.element
         );

         this.translate({
            X: centre.X,
            Y: centre.Y
         }).rotate(rotation);
      }

      setValue(text: string) {
         $(this.text.element).text(text);
         return this;
      }
   }
}