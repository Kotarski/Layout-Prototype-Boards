namespace Circuit.Component._Inductor {
   export function drawLayout(instance: Classes.Layout) {
      const bodyGroup = Svg.Element.Group.make("body");

      const end1 = instance.joints[0];
      const end2 = instance.joints[1];

      let centre = vector(end1, end2).centre().vector;
      let rotation = vector(end1).getAngleTo(end2);

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
         Svg.Element.Path.make([end1, end2], "lead"),
         bodyGroup.translate(centre).rotate(rotation)
      ];
   }
}