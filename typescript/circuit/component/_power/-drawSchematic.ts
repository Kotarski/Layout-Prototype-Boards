import { PowerSchematic } from "./~classes";
import { INDEXCONNECTION } from "./constants";
import getStandardForm from "../../../utility/-getStandardForm";

import { make as makeText } from "../../../svg/element/+text";
import { make as makeGroup } from "../../../svg/element/+group";
import { make as makeLine } from "../../../svg/element/+line";
import { make as makeRect } from "../../../svg/element/+rect";

export default function drawSchematic(instance: PowerSchematic) {
   const bodyGroup = makeGroup("body");

   if (instance.voltage < 0) {
      bodyGroup.append(powerNegativeGraphics(instance.voltage));
   } else if (instance.voltage > 0) {
      bodyGroup.append(powerPositiveGraphics(instance.voltage));
   } else {
      bodyGroup.append(powerGroundGraphics());
   }

   return [
      bodyGroup.translate(instance.joints[INDEXCONNECTION])
   ];
}

function powerNegativeGraphics(voltage: number) {
   const text = getStandardForm(voltage, "V")
   return [
      makeRect({ x: 0, y: 18 }, { width: 40, height: 20 }, { x: 2, y: 2 }, "highlight highlightwithfill extrathick"),
      makeLine({ x: -12, y: 15 }, { x: 12, y: 15 }, "line medium"),
      makeText(text, { x: 0, y: 27 }, "text bold"),
      makeLine({ x: 0, y: 15 }, { x: 0, y: 0 }, "line thin")
   ]
}

function powerPositiveGraphics(voltage: number) {
   const text = getStandardForm(voltage, "V")
   return [
      makeRect({ x: 0, y: -18 }, { width: 40, height: 20 }, { x: 2, y: 2 }, "highlight highlightwithfill extrathick"),
      makeLine({ x: -12, y: -15 }, { x: 12, y: -15 }, "line medium"),
      makeText(text, { x: 0, y: -17 }, "text bold"),
      makeLine({ x: 0, y: -15 }, { x: 0, y: 0 }, "line thin")
   ];
}

function powerGroundGraphics() {
   return [
      makeRect({ x: 0, y: 15 }, { width: 40, height: 20 }, { x: 2, y: 2 }, "highlight highlightwithfill extrathick"),
      makeLine({ x: -18, y: 10 }, { x: 18, y: 10 }, "line medium"),
      makeLine({ x: -12, y: 15 }, { x: 12, y: 15 }, "line medium"),
      makeLine({ x: -6, y: 20 }, { x: 6, y: 20 }, "line medium"),
      makeLine({ x: 0, y: 10 }, { x: 0, y: 0 }, "line thin")
   ]
}

