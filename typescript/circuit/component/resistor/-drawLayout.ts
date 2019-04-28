import { ResistorLayout } from "./~classes";
import vector from "../../../-vector";
import { INDEXEND1, INDEXEND2 } from "./constants";

import { makePath as makePath } from "../../../svg/element/+path";
import { makeGroup as makeGroup } from "../../../svg/element/+group";
import { makeRect as makeRect } from "../../../svg/element/+rect";
//import * as $ from 'jquery';

export default function drawLayout(instance: ResistorLayout) {
   const bodyGroup = makeGroup("body");


   const end1 = instance.states.joints[INDEXEND1];
   const end2 = instance.states.joints[INDEXEND2];

   let centre = vector(end1, end2).centre().vector;

   let rotation = vector(end1).getAngleTo(end2);

   let bodyPath = "m-12.5 -6" + "h25" + "c15 -8 15 20 0 12" + "h-25" + "c-15 +8 -15 -20 0 -12" + "Z";

   const body = makePath(bodyPath, "body")

   const bands = getBands(instance.properties.resistance).map(b => b.clipTo(body.element));

   bodyGroup.append(
      body,
      bands,
      makePath(bodyPath, "highlight nofill")
   );

   return [
      makePath([end1, end2], "lead"),
      bodyGroup.translate(centre).rotate(rotation)
   ];
}

function getBands(num: number) {
   // We don't need a value field
   let exp = num.toExponential(1);

   let sigFig1 = exp.slice(exp.indexOf(".") - 1)[0];
   let sigFig2 = exp.slice(exp.indexOf(".") + 1)[0];
   let multiplier = (
      parseInt(exp.slice(exp.indexOf("e") + 1), 10) - 1
   ).toString();

   let colours: {
      [number: string]: string
   } = {
      "-3": "pink",
      "-2": "silver",
      "-1": "gold",
      "0": "black",
      "1": "brown",
      "2": "red",
      "3": "#FF7F26", //Orange
      "4": "yellow",
      "5": "green",
      "6": "blue",
      "7": "violet",
      "8": "grey",
      "9": "white"
   };

   let b1 = makeRect({ x: -17.5, y: 0 }, { width: 3, height: 18 }, undefined, "band1");
   let b2 = makeRect({ x: -11, y: 0 }, { width: 3, height: 12 }, undefined, "band2");
   let b3 = makeRect({ x: -4, y: 0 }, { width: 3, height: 12 }, undefined, "band3");
   let b4 = makeRect({ x: 3.5, y: 0 }, { width: 4, height: 12 }, undefined, "band4");

   $(b1.element).css("fill", colours[sigFig1]);
   $(b2.element).css("fill", colours[sigFig2]);
   $(b3.element).css("fill", colours[multiplier]);
   $(b4.element).css("fill", "transparent");

   return [b1, b2, b3, b4];
}

