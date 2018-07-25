namespace Svg.Element.Group.InductorBody {
   export type type = ReturnType<typeof make>;
   export function make(value: number, start: Global.Types.vector, end: Global.Types.vector, classes: string = "") {
      const element = Group.make(classes);

      let centre = { x: (start.x + end.x) / 2, y: (start.y + end.y) / 2 };
      let rotation = Utility.Vector.getAngleBetween(start, end);

      const nCoils = 4;
      const wireWidth = 8;
      const coilTop = -15;
      const coilBottom = 15;
      const coilStart = (-(nCoils * wireWidth) / 2 + wireWidth / 4);

      let bodyPath = "M" + (coilStart) + " " + (coilBottom);
      let bodyEdgePath = "";
      for (let i = 1; i < nCoils; i++) {
         let x0 = coilStart + wireWidth * (i - 0.5);
         let x1 = coilStart + wireWidth * (i);
         bodyPath += "L" + (x0) + " " + (coilTop) + "L" + (x1) + " " + (coilBottom);
         bodyEdgePath += "M" + (x0) + " " + (coilBottom) + "L" + (x1) + " " + (coilTop);
      }
      bodyPath += "L" + (-coilStart) + " " + (coilTop);

      element.append(
         Svg.Element.Path.make(bodyPath, "highlight highlightwithfill"),
         Svg.Element.Path.make(bodyPath, "body"),
         Svg.Element.Path.make(bodyEdgePath, "bodyEdge")
      );

      element.translate({ x: centre.x, y: centre.y }).rotate(rotation);

      return element;
   }
}