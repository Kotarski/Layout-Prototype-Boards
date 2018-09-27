namespace Svg.Element.Group.Inductor.Layout {
   export type type = ReturnType<typeof make>;
   export function make(value: number, start: Vector, end: Vector, classes: string = "") {
      const bodyGroup = Group.make(classes);

      let centre = vector(start, end).centre().vector;
      let rotation = vector(start).getAngleTo(end);

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

      bodyGroup.append(
         Svg.Element.Path.make(bodyPath, "highlight highlightwithfill"),
         Svg.Element.Path.make(bodyPath, "body"),
         Svg.Element.Path.make(bodyEdgePath, "bodyEdge")
      );

      return [
         Svg.Element.Path.make([start, end], "lead"),
         bodyGroup.translate(centre).rotate(rotation)
      ];
   }
}