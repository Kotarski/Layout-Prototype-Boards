import { Small } from "./~classes";
import vector from "../../../-vector";
import { INDEXCENTRE, INDEXROTATION } from "./constants";

import { makePath as makePath } from "../../../svg/element/+path";
import { makeGroup as makeGroup } from "../../../svg/element/+group";
import { makeRect as makeRect } from "../../../svg/element/+rect";
import { makeTextSeq as makeTextSequence } from "../../../svg/element/groups/+textSequence";

import { gridSpacing } from "../../../~constants";

export default function drawSmall(instance: Small) {
   const bodyGroup = makeGroup("body");

   const centre = instance.joints[INDEXCENTRE];
   const rotationPoint = instance.joints[INDEXROTATION];

   let rotation = vector(centre).getAngleTo(rotationPoint);


   const gS = gridSpacing;

   // Power Rails strings:
   const railPairPathString = [
      "M" + (gS * -14.2) + " " + (gS * -10.5),
      "H" + (gS * 14.2),
      "M" + (gS * -14.2) + " " + (gS * 7.5),
      "H" + (gS * 14.2)
   ].join();

   const plus = "m-5 0 h10 m-5 -5 v10 m0 -5";

   const plussesPathString = [
      "M" + (gS * -15) + " " + (gS * -10),
      "M" + (gS * 15) + " " + (gS * -10),
      "M" + (gS * -15) + " " + (gS * 8),
      "M" + (gS * 15) + " " + (gS * 8),
      "" // Do not remove.     
   ].join(plus);

   const minus = "m0 -5 v10 m0 -5";

   const minusesPathString = [
      "M" + (gS * -15) + " " + (gS * -11),
      "M" + (gS * 15) + " " + (gS * -11),
      "M" + (gS * -15) + " " + (gS * 7),
      "M" + (gS * 15) + " " + (gS * 7),
      "" // Do not remove.  
   ].join(minus);


   const size = {
      width: 32 * gS,
      height: 22 * gS
   };

   bodyGroup.append([
      //Body
      makeRect({ x: 0, y: 0 }, size, { x: 4, y: 4 }, "body"),
      //Centre rut
      makeRect({ x: 0, y: 0 }, { width: size.width, height: gS * 0.75, }, { x: 0, y: 0 }, "rut"),
      //Body Highlights
      makeRect({ x: 0, y: 0 }, size, { x: 4, y: 4 }, "body highlight"),
      //Power rail positives
      makePath(railPairPathString + plussesPathString, "rail positive"),
      //Power rail negatives
      makePath(railPairPathString + minusesPathString, "rail negative").translate({ x: 0, y: gS * 3 }),
      //Text Left (portrait)
      makeTextSequence({ x: 14.5 * gS - gS / 6, y: -6.5 * gS }, { x: 0, y: gS }, { start: 1, length: 30 }).rotate(90),
      //Text Right (portrait)
      makeTextSequence({ x: 14.5 * gS - gS / 6, y: 6.5 * gS }, { x: 0, y: gS }, { start: 1, length: 30 }).rotate(90),
      //Text Top Left (portrait)
      makeTextSequence({ x: 15.5 * gS - gS / 4, y: -5.5 * gS }, { x: gS, y: 0 }, "abcde").rotate(90),
      //Text Bottom Left (portrait)
      makeTextSequence({ x: -15.5 * gS, y: -5.5 * gS }, { x: gS, y: 0 }, "abcde").rotate(90),
      //Text Top Right (portrait)
      makeTextSequence({ x: 15.5 * gS - gS / 4, y: 5.5 * gS }, { x: -gS, y: 0 }, "jihgf").rotate(90),
      //Text Bottom Right (portrait)
      makeTextSequence({ x: -15.5 * gS, y: 5.5 * gS }, { x: -gS, y: 0 }, "jihgf").rotate(90),
   ])

   return [
      bodyGroup.translate(centre).rotate(rotation)
   ];
}

