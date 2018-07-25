namespace Svg.Element.Group.BipolarBody {
   export type type = ReturnType<typeof make>;
   export function make(
      text: string,
      start: Global.Types.vector,
      middle: Global.Types.vector,
      end: Global.Types.vector,
      classes: string = ""
   ) {
      const element = Group.make(classes);

      let centre = {
         x: (start.x + middle.x + end.x) / 3,
         y: (start.y + middle.y + end.y) / 3,
      };

      let rotation = Utility.Vector.getAngleBetween(start, end);

      let semiCircleString =
         "M " + (16) + " " + (4) +
         "a " + (1) + " " + (1) + " " + (0) + " " + (0) + " " + (0) + " " + (-32) + " " + (0) +
         "v " + (3) +
         "h " + (32) +
         "v " + (-3) +
         "Z";

      element.append(
         Svg.Element.Path.make(semiCircleString, "body highlight").element,
         Svg.Element.Text.make(text, { x: 0, y: 4 }, "text").element
      );

      element.translate({ x: centre.x, y: centre.y }).rotate(rotation);

      return element;
   }
}