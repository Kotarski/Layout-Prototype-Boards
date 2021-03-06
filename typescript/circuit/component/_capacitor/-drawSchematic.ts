import { Schematic } from "./~classes";
import vector, { Vector } from "../../../-vector";
import { INDEXANODE, INDEXCATHODE } from "./constants";
import getStandardForm from "../../../utility/-getStandardForm";

import { make as makePath } from "../../../svg/element/+path";
import { make as makeText } from "../../../svg/element/+text";
import { make as makeGroup } from "../../../svg/element/+group";
import { make as makeLine } from "../../../svg/element/+line";
import { make as makeRect } from "../../../svg/element/+rect";

export default function drawSchematic(instance: Schematic) {
   const bodyGroup = makeGroup("body");

   const cathodeEnd = instance.joints[INDEXCATHODE];
   const anodeEnd = instance.joints[INDEXANODE];

   let centre = vector(cathodeEnd, anodeEnd).centre().vector;
   let rotation = vector(cathodeEnd).getAngleTo(anodeEnd);

   let [cathodeStart, anodeStart]: Vector[] = vector(
      { x: -6, y: 0 }, { x: 6, y: 0 }
   ).rotate(rotation).sumWith(centre).vectors;

   //Text
   let text = getStandardForm(instance.capacitance, 'F')

   bodyGroup.append(
      makeRect(vector(0), { width: 15, height: 30 }, vector(2), "highlight highlightwithfill extrathick"),
      makeLine({ x: -4, y: -15 }, { x: -4, y: +15 }, "line thick nocap"),
      makeLine({ x: +4, y: -15 }, { x: +4, y: +15 }, "line thick nocap"),
   );

   if (instance.isPolarised) {
      bodyGroup.append(makePath([
         [{ x: +15, y: -10 }, { x: +7, y: -10 }],
         [{ x: +11, y: -6 }, { x: +11, y: -14 }]
      ], "line thin"));
   }

   return [
      makePath([[cathodeStart, cathodeEnd], [anodeStart, anodeEnd]], "line thin"),
      bodyGroup.translate(centre).rotate(rotation),
      makeText(text, { x: 0, y: -20 }, "text").translate(centre).rotatePosition(rotation)
   ];
}

