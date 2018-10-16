import { Schematic } from "./~classes";
import vector, { Vector } from "../../../-vector";
import { INDEXEND1, INDEXEND2 } from "./constants";
import getStandardForm from "../../../utility/-getStandardForm";

import { make as makePath } from "../../../svg/element/+path";
import { make as makeText } from "../../../svg/element/+text";
import { make as makeGroup } from "../../../svg/element/+group";
import { make as makeRect } from "../../../svg/element/+rect";

export default function drawSchematic(instance: Schematic) {
   const bodyGroup = makeGroup("body");


   const end1 = instance.joints[INDEXEND1];
   const end2 = instance.joints[INDEXEND2];

   let centre = vector(end1, end2).centre().vector;
   let rotation = vector(end1).getAngleTo(end2);

   let [start1, start2]: Vector[] = vector(
      { x: -24, y: 0 }, { x: 24, y: 0 }
   ).rotate(rotation).sumWith(centre).vectors;

   //Text
   let text = getStandardForm(instance.resistance, 'Ω')

   bodyGroup.append(
      makeRect(vector(0), { width: 46, height: 18 }, vector(2), "highlight highlightwithfill extrathick"),
      makeRect(vector(0), { width: 46, height: 18 }, vector(2), "body white")
   );

   let textEl = makeText(text, { x: 0, y: -15 }, "text");

   return [
      makePath([[start1, end1], [start2, end2]], "line thin"),
      bodyGroup.translate(centre).rotate(rotation),
      textEl.translate(centre).rotatePosition(rotation),
   ];
}

