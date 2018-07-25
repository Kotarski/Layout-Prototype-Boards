namespace Svg.Element.Group.DiodeBody {
   export type type = ReturnType<typeof make>;
   export function make(value: number, start: Global.Types.vector, end: Global.Types.vector, classes: string = "") {
      const element = Group.make(classes);

      let centre = { x: (start.x + end.x) / 2, y: (start.y + end.y) / 2 };
      let rotation = Utility.Vector.getAngleBetween(start, end);

      element.append(
         Svg.Element.Rect.make({ x: -5.5, y: 0 }, { width: 29, height: 15 }, { x: 0, y: 0 }, "body"),
         Svg.Element.Rect.make({ x: 17.5, y: 0 }, { width: 5, height: 15 }, { x: 0, y: 0 }, "body"),
         Svg.Element.Rect.make({ x: 12, y: 0 }, { width: 6, height: 15 }, { x: 0, y: 0 }, "cathode"),
         Svg.Element.Rect.make({ x: 0, y: 0 }, { width: 40, height: 15 }, { x: 1, y: 1 }, "highlight nofill")
      );
      element.translate({ x: centre.x, y: centre.y }).rotate(rotation);

      return element;
   }
}