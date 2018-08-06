namespace Svg.Element.Group.Capacitor.Layout {
   export namespace Ceramic {
      export type type = ReturnType<typeof make>;
      export function make(
         value: number,
         start: Vector,
         end: Vector,
         classes: string = ""
      ) {
         const bodyGroup = Group.make(classes);

         let centre = vector(start, end).centre().vector;

         let rotation = vector(start).getAngleTo(end);

         const text = Utility.getStandardForm(value, 'F');

         bodyGroup.append(
            Svg.Element.Ellipse.make({ x: 0, y: 0 }, { x: 16, y: 8 }, "body highlight nofill"),
            Svg.Element.Text.make(text, { x: 0, y: 0 }, "text")
         );

         return [
            Svg.Element.Path.make([start, end], "lead"),
            bodyGroup.translate(centre).rotate(rotation)
         ];
      }
   }

   export namespace Electrolytic {
      export type type = ReturnType<typeof make>;
      export function make(
         value: number,
         start: Vector,
         end: Vector,
         classes: string = ""
      ) {
         const bodyGroup = Group.make(classes);

         let centre = vector(start, end).centre().vector;

         let rotation = vector(start).getAngleTo(end);

         const text = Utility.getStandardForm(value, 'F');

         const bodyArcEndPoint = 14 / Math.SQRT2;
         const textArcEndPoint = 12.5 / Math.SQRT2;
         const bodyPathString = "m14 0 A14 14 0 1 0 " + (bodyArcEndPoint) + " " + (bodyArcEndPoint);
         const minusPathString = "m14 0 A14 14 0 0 1 " + (bodyArcEndPoint) + " " + (bodyArcEndPoint);
         const pathForTextString = "m" + (textArcEndPoint) + " " + (textArcEndPoint) + "A12.5 12.5 0 1 1 12.5 0";

         bodyGroup.append(
            Svg.Element.Circle.make({ x: 0, y: 0 }, 16, "highlight nofill"),
            Path.make(bodyPathString, "body").rotate(157.5),
            Path.make(minusPathString, "minus").rotate(157.5),
            Text.make(text, { x: 1, y: 0 }, "text").followPath(pathForTextString).rotate(157.5)
         );

         return [
            Svg.Element.Path.make([start, end], "lead"),
            bodyGroup.translate(centre).rotate(rotation)
         ];
      }
   }
}