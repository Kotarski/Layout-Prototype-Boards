import { DiodeSchematic } from "./~classes";
import vector, { Vector } from "../../../-vector";
import { INDEXANODE, INDEXCATHODE } from "./constants";
import getStandardForm from "../../../utility/-getStandardForm";

import { makePath as makePath } from "../../../svg/element/+path";
import { makeText as makeText } from "../../../svg/element/+text";
import { makeGroup as makeGroup } from "../../../svg/element/+group";
import { makeCircle as makeCircle } from "../../../svg/element/+circle";
//import * as $ from 'jquery';

export default function drawSchematic(instance: DiodeSchematic) {
   const bodyGroup = makeGroup("body");

   const cathodeEnd = instance.states.joints[INDEXCATHODE];
   const anodeEnd = instance.states.joints[INDEXANODE];

   const centre = vector(cathodeEnd, anodeEnd).centre().vector;
   const rotation = vector(anodeEnd).getAngleTo(cathodeEnd);

   let [cathodeStart, anodeStart]: Vector[] = vector(
      { x: -12, y: 0 }, { x: 12, y: 0 }
   ).rotate(rotation).sumWith(centre).vectors;

   //Text
   let text = (instance.properties.breakdownVoltage < 51)
      ? getStandardForm(instance.properties.breakdownVoltage, 'V')
      : getStandardForm(instance.properties.saturationCurrent, 'A');

   const bodyPath = 'M 12 0 L -12 12 L -12 -12 L 12 0 Z';
   bodyGroup.append(
      makePath(bodyPath, "body highlight highlightwithfill extrathick"),
      makePath(bodyPath, "body black"),
      // Polarisation Line
      makePath('M 12 -12 L 12 12', "line medium")
   );


   if (instance.properties.color === "N/A" || instance.properties.color === undefined) {
      if (instance.properties.breakdownVoltage < 51) {
         // Add the "wings" for xener
         bodyGroup.append(makePath([[{ x: 12, y: -12 }, { x: 18, y: -12 },], [{ x: 12, y: 12 }, { x: 6, y: 12 }]], "line medium"));
      }
   } else {
      // LED
      const arrowJointsBase = vector([{ x: 0, y: 3 }, { x: -4, y: 0 }, { x: 0, y: -3 }, { x: -4, y: 0 }, { x: 8, y: 0 }]);
      const arrowJoints1 = arrowJointsBase.sumWith({ x: -16, y: -10 }).rotate(-116.43).vectors;
      const arrowJoints2 = arrowJointsBase.sumWith({ x: -16, y: 0 }).rotate(-116.43).vectors;
      const colorCircle = makeCircle({ x: -4, y: 0 }, 4, "line thin");

      $(colorCircle.element).css("fill", instance.properties.color);
      $(colorCircle.element).css("stroke", instance.properties.color);

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

