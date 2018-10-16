import { Layout } from "./~classes";
import vector from "../../../-vector";
import { INDEXANODE, INDEXCATHODE } from "./constants";

import { make as makePath } from "../../../svg/element/+path";
import { make as makeGroup } from "../../../svg/element/+group";
import { make as makeCircle } from "../../../svg/element/+circle";
import { make as makeRect } from "../../../svg/element/+rect";
//import * as $ from 'jquery';

export default function drawLayout(instance: Layout) {
   const bodyGroup = makeGroup("body");

   const cathodeEnd = instance.joints[INDEXCATHODE];
   const anodeEnd = instance.joints[INDEXANODE];

   const centre = vector(cathodeEnd, anodeEnd).centre().vector;
   const rotation = vector(cathodeEnd).getAngleTo(anodeEnd);

   if (instance.color === "N/A") {
      bodyGroup.append(
         makeRect({ x: -5.5, y: 0 }, { width: 29, height: 15 }, { x: 0, y: 0 }, "body"),
         makeRect({ x: 17.5, y: 0 }, { width: 5, height: 15 }, { x: 0, y: 0 }, "body"),
         makeRect({ x: 12, y: 0 }, { width: 6, height: 15 }, { x: 0, y: 0 }, "cathode"),
         makeRect({ x: 0, y: 0 }, { width: 40, height: 15 }, { x: 1, y: 1 }, "highlight nofill")
      );
   } else {
      $(bodyGroup.element).addClass("led");

      const bodyString =
         "M " + (10) + " " + (15) +
         "a " + (18) + " " + (18) + " " + (0) + " " + (1) + " " + (0) + " " + (-20) + " " + (0) +
         "Z";

      const highlightString =
         "M " + (10) + " " + (16) +
         "a " + (18.8) + " " + (18.8) + " " + (0) + " " + (1) + " " + (0) + " " + (-20) + " " + (0) +
         "Z";

      const edge = makePath(bodyString, "edge");
      const middle = makeCircle({ x: 0, y: 0 }, 14, "centre");

      $([edge.element, middle.element]).css("fill", instance.color);


      bodyGroup.append(
         edge,
         makePath(bodyString, "darkener"),
         middle,
         makeCircle({ x: 0, y: 0 }, 8, "lightener"),
         makePath(highlightString, "nofill highlight"),
      ).rotate(-90);
   }

   return [
      makePath([cathodeEnd, anodeEnd], "lead"),
      bodyGroup.translate(centre).rotate(rotation)
   ];
}
