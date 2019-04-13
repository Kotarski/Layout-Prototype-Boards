import { Layout } from "./~classes";
import vector from "../../../-vector";
import { INDEXEND1, INDEXEND2 } from "./constants";

import { makePath as makePath } from "../../../svg/element/+path";
import { makeGroup as makeGroup } from "../../../svg/element/+group";

export default function drawLayout(instance: Layout) {
   const bodyGroup = makeGroup("body");

   const end1 = instance.joints[INDEXEND1];
   const end2 = instance.joints[INDEXEND2];

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
      makePath(bodyPath, "highlight highlightwithfill"),
      makePath(bodyPath, "body"),
      makePath(bodyEdgePath, "bodyEdge")
   );

   return [
      makePath([end1, end2], "lead"),
      bodyGroup.translate(centre).rotate(rotation)
   ];
}
