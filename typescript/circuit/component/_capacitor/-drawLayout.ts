import { Layout } from "./~classes";
import vector from "../../../-vector";
import { INDEXANODE, INDEXCATHODE } from "./constants";
import getStandardForm from "../../../utility/-getStandardForm";

import { makePath as makePath } from "../../../svg/element/+path";
import { makeText as makeText } from "../../../svg/element/+text";
import { makeGroup as makeGroup } from "../../../svg/element/+group";
import { makeCircle as makeCircle } from "../../../svg/element/+circle";
import { makeEllipse as makeEllipse } from "../../../svg/element/+ellipse";
//import * as $ from 'jquery';

export default function drawLayout(instance: Layout) {

   const bodyGroup = makeGroup("body");

   const cathodeEnd = instance.states.joints[INDEXCATHODE];
   const anodeEnd = instance.states.joints[INDEXANODE];

   const centre = vector(cathodeEnd, anodeEnd).centre().vector;
   const rotation = vector(cathodeEnd).getAngleTo(anodeEnd);
   const textString = getStandardForm(instance.properties.capacitance, 'F');

   if (instance.properties.isPolarised) {
      // Electrolytic
      $(bodyGroup.element).addClass("electrolytic");


      const getElectrolyticPath = (radii: number, isMinus: boolean, classes:string = "") => {
         const [start, end] = [vector(radii / Math.SQRT2), { x: radii, y: 0 }]
         const [arc, sweep] = isMinus ? [0,0]: [1,1]
         return makePath("", classes).m(start).A({ radii, arc, sweep, end });
      }

      const bodyPath = getElectrolyticPath(14, false, "body");
      const minusPath = getElectrolyticPath(14, true, "minus");

      const highlight = makeCircle({ x: 0, y: 0 }, 16, "highlight nofill");
      const text = makeText(textString, { x: 1, y: 0 }, "text").followPath(
         getElectrolyticPath(12.5, false)
      );

      bodyGroup.append(highlight, bodyPath, minusPath, text).rotate(157.5);
   } else {
      // Ceramic
      $(bodyGroup.element).addClass("ceramic");

      bodyGroup.append(
         makeEllipse({ x: 0, y: 0 }, { x: 16, y: 8 }, "body highlight nofill"),
         makeText(textString, { x: 0, y: 0 }, "text")
      );
   }

   return [
      makePath([cathodeEnd, anodeEnd], "lead"),
      bodyGroup.translate(centre).rotate(rotation)
   ];
}

