namespace Svg.Element.Group.CapacitorBodyElectrolytic {
   export type type = ReturnType<typeof make>;
   export function make(
      value: number,
      start: Global.Types.vector,
      end: Global.Types.vector,
      classes: string = ""
   ) {
      const element = Group.make(classes);

      const centre = {
         x: (start.x + end.x) / 2,
         y: (start.y + end.y) / 2
      };

      //TODO
      let rotation = Utility.Vector.getAngleBetween(start, end);

      const text = Utility.getStandardForm(value, 'F');

      const bodyArcEndPoint = 14 / Math.SQRT2;
      const textArcEndPoint = 12.5 / Math.SQRT2;
      const bodyPathString = "m14 0 A14 14 0 1 0 " + (bodyArcEndPoint) + " " + (bodyArcEndPoint);
      const minusPathString = "m14 0 A14 14 0 0 1 " + (bodyArcEndPoint) + " " + (bodyArcEndPoint);
      const pathForTextString = "m" + (textArcEndPoint) + " " + (textArcEndPoint) + "A12.5 12.5 0 1 1 12.5 0";

      element.append(
         Svg.Element.Circle.make({ x: 0, y: 0 }, 16, "highlight nofill"),
         Path.make(bodyPathString, "body").rotate(157.5),
         Path.make(minusPathString, "minus").rotate(157.5),
         Text.make(text, { x: 1, y: 0 }, "text").followPath(pathForTextString).rotate(157.5)
      );

      element.translate({ x: centre.x, y: centre.y }).rotate(rotation);

      return element;
   }
}

