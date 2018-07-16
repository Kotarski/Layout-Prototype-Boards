namespace Svg.Elements.Groups {
   export class DiodeBody extends Svg.Elements.Group {
      constructor(betweenStart: Global.Types.vector, betweenEnd: Global.Types.vector, classes: string = "") {
         super(classes);
         let centre = { X: (betweenStart.X + betweenEnd.X) / 2, Y: (betweenStart.Y + betweenEnd.Y) / 2 };
         let rotation = Math.atan2(centre.Y - betweenStart.Y, centre.X - betweenStart.X) * 180 / Math.PI;

         this.append(
            new Svg.Elements.Rect({ X: -5.5, Y: 0 }, { width: 29, height: 15 }, { X: 0, Y: 0 }, "body"),
            new Svg.Elements.Rect({ X: 17.5, Y: 0 }, { width: 5, height: 15 }, { X: 0, Y: 0 }, "body"),
            new Svg.Elements.Rect({ X: 12, Y: 0 }, { width: 6, height: 15 }, { X: 0, Y: 0 }, "cathode"),
            new Svg.Elements.Rect({ X: 0, Y: 0 }, { width: 40, height: 15 }, { X: 1, Y: 1 }, "highlight nofill")
         );

         this.translate({ X: centre.X, Y: centre.Y }).rotate(rotation);
      }
      setValue(num: number) {

         return this;
      }
   }
}