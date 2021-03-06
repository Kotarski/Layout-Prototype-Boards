import getStandardForm from "../../../utility/-getStandardForm";
import vector, { Vector } from "../../../-vector";
import { BipolarLayout } from "./~classes";
import { INDEXBASE, INDEXCOLLECTOR, INDEXEMITTER } from "./constants";

import { make as makePath } from "../../../svg/element/+path";
import { make as makeText } from "../../../svg/element/+text";
import { make as makeGroup } from "../../../svg/element/+group";
import { make as makeLine } from "../../../svg/element/+line";
import { make as makeCircle } from "../../../svg/element/+circle";

export default function drawSchematic(instance: BipolarLayout) {
   const bodyGroup = makeGroup("body");

   const emitterEnd = instance.joints[INDEXEMITTER];
   const collectorEnd = instance.joints[INDEXCOLLECTOR];
   const baseEnd = instance.joints[INDEXBASE];

   // Same as vector([{ x: 7, y: 6 }, { x: 7, y: -6 }, { x: -7, y: 0 }, { x: 7, y: 6 }])
   //    .rotate(149 | -31).sumWith({ x: 18, y: -9.2 } | { x: 6, y: -16.4 })
   const arrowJoints = (instance.type === "PNP")
      ? [{ x: 15, y: -18 }, { x: 9, y: -7.5 }, { x: 24, y: -5.5 }, { x: 15, y: -18 }]
      : [{ x: 9, y: -7.5 }, { x: 15, y: -18 }, { x: 0, y: -20 }, { x: 9, y: -7.5 }];

   // The drawings orientation (before transforms) is: 
   //   emitter at the top
   //   collector at the bottom
   //   base to the right
   bodyGroup.append(
      //Highlight
      makeCircle({ x: 10, y: 0 }, 30, "extrathick highlight"),
      //Base Vertical Bar
      makeLine({ x: 25, y: -15 }, { x: 25, y: +15 }, "line medium-thick nocap"),
      //Collector Angled Line
      makeLine({ x: 25, y: -5 }, { x: 0, y: -20 }, "line thin"),
      //Emitter Angled Line
      makeLine({ x: 25, y: 5 }, { x: 0, y: 20 }, "line thin"),
      //Base Horizontal Line to circle
      makeLine({ x: 25, y: 0 }, { x: 40, y: 0 }, "line thin"),
      //Collector Vertical Line to circle
      makeLine({ x: 0, y: -20 }, { x: 0, y: -28 }, "line thin"),
      //Emitter Vertical Line to circle
      makeLine({ x: 0, y: 20 }, { x: 0, y: 28 }, "line thin"),
      //Arrow
      makePath(arrowJoints, "body black thin"),
      //Circle
      makeCircle({ x: 10, y: 0 }, 30, "line medium nofill")
   );


   // Image centre does not take base into account
   // Is always directly between the emitter and collector
   const centre = vector(emitterEnd, collectorEnd).centre().vector;

   // all angles are relative to the x-axis, hence in default orientation:
   //   when no rotation is required, angleEmitterCentre = 90, 
   const angleCentreBase = vector(centre).getAngleTo(baseEnd);
   const angleEmitterCollector = vector(emitterEnd).getAngleTo(collectorEnd);

   const rotation = angleEmitterCollector - 90;

   // Don't ask.
   const scale = (((angleEmitterCollector - angleCentreBase + 360) % 360) > 180)
      ? { x: -1 }
      : { x: 1 };

   // Only the start of the connections should be transformed, 
   // the ends should be absolute.
   // (Hence using vector transforms, not svg transforms)
   const [emitterStart, collectorStart, baseStart]: Vector[] = vector(
      { x: 0, y: -28 }, { x: 0, y: 28 }, { x: 40, y: 0 }
   ).scaleWith(scale).rotate(rotation).sumWith(centre).vectors;


   const joints = [
      [emitterStart, emitterEnd],
      [collectorStart, collectorEnd],
      [baseStart, baseEnd],
   ]

   const text = getStandardForm(instance.currentGain, '')
   const textEl = makeText(text, vector({ x: -40, y: 0 }).scaleWith(scale), "text");

   return [
      bodyGroup.translate(centre).rotate(rotation).scale(scale, false),
      makePath(joints, "line thin"),
      textEl.translate(centre).rotatePosition(rotation),
   ];
}
