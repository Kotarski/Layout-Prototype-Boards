namespace Svg.Element.Group.BipolarBody {
   export type type = ReturnType<typeof make>;
   export function make(
      text: string,
      centre: Vector,
      rotation: number,
      classes: string = ""
   ) {
      const element = Group.make(classes);

      //let centre = vector(start, middle, end).centre().vector;
      //let rotate = vector(start).getAngleTo(end);

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

      element.translate(centre).rotate(rotation);

      return element;
   }
}