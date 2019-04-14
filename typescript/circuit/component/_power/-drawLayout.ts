import { PowerLayout } from "./~classes";
import { INDEXCONNECTION } from "./constants";

import { makeText as makeText } from "../../../svg/element/+text";
import { makeGroup as makeGroup } from "../../../svg/element/+group";
import { makeCircle as makeCircle } from "../../../svg/element/+circle";
import { makeRect as makeRect } from "../../../svg/element/+rect";

export default function drawLayout(instance: PowerLayout) {
   const bodyGroup = makeGroup("body");

   const text = instance.properties.voltage.toFixed(1);

   bodyGroup.append(
      makeRect({ x: 0, y: -35 }, { width: 180, height: 95 }, { x: 10, y: 10 }, "body highlight"),
      makeRect({ x: 0, y: -45 }, { width: 160, height: 65 }, { x: 10, y: 10 }, "screen"),
      makeText("8".repeat(text.length - 1), { x: 0, y: -20 }, "screentext off"),
      makeText(text, { x: 0, y: -20 }, "screentext on"),
   );

   return [
      bodyGroup.translate(instance.states.joints[INDEXCONNECTION]),
      makeCircle(instance.states.joints[INDEXCONNECTION], 5, "hole")
   ];
}
