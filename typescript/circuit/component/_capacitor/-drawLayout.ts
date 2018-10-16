import { Layout } from "./~classes";
import vector from "../../../-vector";
import { INDEXANODE, INDEXCATHODE } from "./constants";
import getStandardForm from "../../../utility/-getStandardForm";

import { make as makePath } from "../../../svg/element/+path";
import { make as makeText } from "../../../svg/element/+text";
import { make as makeGroup } from "../../../svg/element/+group";
import { make as makeCircle } from "../../../svg/element/+circle";
import { make as makeEllipse } from "../../../svg/element/+ellipse";
//import * as $ from 'jquery';

export default function drawLayout(instance: Layout) {

   const bodyGroup = makeGroup("body");

   const cathodeEnd = instance.joints[INDEXCATHODE];
   const anodeEnd = instance.joints[INDEXANODE];

   const centre = vector(cathodeEnd, anodeEnd).centre().vector;
   const rotation = vector(cathodeEnd).getAngleTo(anodeEnd);
   const text = getStandardForm(instance.capacitance, 'F');

   if (instance.isPolarised) {
      // Electrolytic
      $(bodyGroup.element).addClass("electrolytic");

      const bodyArcEndPoint = 14 / Math.SQRT2;
      const textArcEndPoint = 12.5 / Math.SQRT2;
      const bodyPathString = "m14 0 A14 14 0 1 0 " + (bodyArcEndPoint) + " " + (bodyArcEndPoint);
      const minusPathString = "m14 0 A14 14 0 0 1 " + (bodyArcEndPoint) + " " + (bodyArcEndPoint);
      const pathForTextString = "m" + (textArcEndPoint) + " " + (textArcEndPoint) + "A12.5 12.5 0 1 1 12.5 0";

      bodyGroup.append(
         makeCircle({ x: 0, y: 0 }, 16, "highlight nofill"),
         makePath(bodyPathString, "body").rotate(157.5),
         makePath(minusPathString, "minus").rotate(157.5),
         makeText(text, { x: 1, y: 0 }, "text").followPath(pathForTextString).rotate(157.5)
      );
   } else {
      // Ceramic
      $(bodyGroup.element).addClass("ceramic");

      bodyGroup.append(
         makeEllipse({ x: 0, y: 0 }, { x: 16, y: 8 }, "body highlight nofill"),
         makeText(text, { x: 0, y: 0 }, "text")
      );
   }

   return [
      makePath([cathodeEnd, anodeEnd], "lead"),
      bodyGroup.translate(centre).rotate(rotation)
   ];
}

