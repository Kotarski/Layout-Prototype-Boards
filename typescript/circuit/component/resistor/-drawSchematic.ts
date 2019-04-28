import { ResistorSchematic } from "./~classes";
import vector, { Vector } from "../../../-vector";
import { INDEXEND1, INDEXEND2 } from "./constants";
import getStandardForm from "../../../utility/-getStandardForm";

import { makePath as makePath } from "../../../svg/element/+path";
import { makeText as makeText } from "../../../svg/element/+text";
import { makeGroup as makeGroup } from "../../../svg/element/+group";
import { makeRect as makeRect } from "../../../svg/element/+rect";

export default function drawSchematic(instance: ResistorSchematic) {
   const bodyGroup = makeGroup("body");


   const end1 = instance.states.joints[INDEXEND1];
   const end2 = instance.states.joints[INDEXEND2];

   let centre = vector(end1, end2).centre().vector;
   let rotation = vector(end1).getAngleTo(end2);

   let [start1, start2]: Vector[] = vector(
      { x: -24, y: 0 }, { x: 24, y: 0 }
   ).rotate(rotation).sumWith(centre).vectors;

   //Text
   let text = getStandardForm(instance.properties.resistance, 'Ω')

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
