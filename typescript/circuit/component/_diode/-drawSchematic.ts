import { Schematic } from "./~classes";
import vector, { Vector } from "../../../-vector";
import { INDEXANODE, INDEXCATHODE } from "./constants";
import getStandardForm from "../../../utility/-getStandardForm";

import { make as makePath } from "../../../svg/element/+path";
import { make as makeText } from "../../../svg/element/+text";
import { make as makeGroup } from "../../../svg/element/+group";
import { make as makeCircle } from "../../../svg/element/+circle";
//import * as $ from 'jquery';

export default function drawSchematic(instance: Schematic) {
   const bodyGroup = makeGroup("body");

   const cathodeEnd = instance.joints[INDEXCATHODE];
   const anodeEnd = instance.joints[INDEXANODE];

   const centre = vector(cathodeEnd, anodeEnd).centre().vector;
   const rotation = vector(cathodeEnd).getAngleTo(anodeEnd);

   let [cathodeStart, anodeStart]: Vector[] = vector(
      { x: -12, y: 0 }, { x: 12, y: 0 }
   ).rotate(rotation).sumWith(centre).vectors;

   //Text
   let text = (instance.breakdownVoltage < 51)
      ? getStandardForm(instance.breakdownVoltage, 'V')
      : getStandardForm(instance.saturationCurrent, 'A');

   const bodyPath = 'M 12 0 L -12 12 L -12 -12 L 12 0 Z';
   bodyGroup.append(
      makePath(bodyPath, "body highlight highlightwithfill extrathick"),
      makePath(bodyPath, "body black"),
      // Polarisation Line
      makePath('M 12 -12 L 12 12', "line medium")
   );


   if (instance.color === "N/A" || instance.color === undefined) {
      if (instance.breakdownVoltage < 51) {
         // Add the "wings" for xener
         bodyGroup.append(makePath([[{ x: 12, y: -12 }, { x: 18, y: -12 },], [{ x: 12, y: 12 }, { x: 6, y: 12 }]], "line medium"));
      }
   } else {
      // LED
      const arrowJointsBase = vector([{ x: 0, y: 3 }, { x: -4, y: 0 }, { x: 0, y: -3 }, { x: -4, y: 0 }, { x: 8, y: 0 }]);
      const arrowJoints1 = arrowJointsBase.sumWith({ x: -16, y: -10 }).rotate(-116.43).vectors;
      const arrowJoints2 = arrowJointsBase.sumWith({ x: -16, y: 0 }).rotate(-116.43).vectors;
      const colorCircle = makeCircle({ x: -4, y: 0 }, 4, "line thin");

      $(colorCircle.element).css("fill", instance.color);
      $(colorCircle.element).css("stroke", instance.color);

      bodyGroup.append(
         makePath(arrowJoints1, "line black thin"), //Arrow1
         makePath(arrowJoints2, "line black thin"), //Arrow2
         colorCircle //Color Indicator
      );
   }

   const textEl = makeText(text, { x: 0, y: -15 }, "text");

   return [
      makePath([[cathodeStart, cathodeEnd], [anodeStart, anodeEnd]], "line thin"),
      bodyGroup.translate(centre).rotate(rotation),
      textEl.translate(centre).rotatePosition(rotation),
   ];
}

