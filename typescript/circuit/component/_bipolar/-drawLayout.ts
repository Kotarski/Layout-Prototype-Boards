import { BipolarLayout } from "./~classes";
import vector, { Vector } from "../../../-vector";
import { INDEXBASE, INDEXCOLLECTOR, INDEXEMITTER } from "./constants";

import { make as makePath } from "../../../svg/element/+path";
import { make as makeText } from "../../../svg/element/+text";
import { make as makeGroup } from "../../../svg/element/+group";

export default function drawLayout(instance: BipolarLayout) {
   const bodyGroup = makeGroup("body");

   const emitterEnd = instance.joints[INDEXEMITTER];
   const collectorEnd = instance.joints[INDEXCOLLECTOR];
   const baseEnd = instance.joints[INDEXBASE];

   const centre = vector(emitterEnd, collectorEnd, baseEnd).centre().vector;
   const rotation = vector(emitterEnd).getAngleTo(baseEnd);

   const [emitterStart, collectorStart, baseStart]: Vector[] = vector(
      { x: - 12, y: 3 }, { x: 0, y: -2 }, { x: 12, y: 3 }
   ).rotate(rotation).sumWith(centre).vectors;

   const joints = [
      [emitterStart, emitterEnd],
      [collectorStart, collectorEnd],
      [baseStart, baseEnd],
   ]

   const semiCircleString =
      "M " + (16) + " " + (4) +
      "a " + (1) + " " + (1) + " " + (0) + " " + (0) + " " + (0) + " " + (-32) + " " + (0) +
      "v " + (3) +
      "h " + (32) +
      "v " + (-3) +
      "Z";

   bodyGroup.append(
      makePath(semiCircleString, "body highlight"),
      makeText(instance.type, { x: 0, y: 4 }, "text")
   );

   return [
      makePath(joints, "lead"),
      bodyGroup.translate(centre).rotate(rotation),
      makePath(joints, "leadguide")
   ];
}