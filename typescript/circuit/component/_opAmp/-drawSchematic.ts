import { Schematic } from "./~classes";
import vector, { Vector } from "../../../-vector";
import { INDEXINPOS, INDEXINNEG, INDEXOUT, INDEXPOW1, INDEXPOW2 } from "./constants";

import { makePath as makePath } from "../../../svg/element/+path";
import { makeGroup as makeGroup } from "../../../svg/element/+group";
import { makeLine as makeLine } from "../../../svg/element/+line";

export default function drawSchematic(instance: Schematic) {
   const bodyGroup = makeGroup("body");

   const inPEnd = instance.joints[INDEXINPOS];
   const inNEnd = instance.joints[INDEXINNEG];
   const outEnd = instance.joints[INDEXOUT];
   const pow1End = instance.joints[INDEXPOW1];
   const pow2End = instance.joints[INDEXPOW2];

   // Corners of the body triangle
   const bodyJoints = [{ x: -25, y: -25 }, { x: 25, y: 0 }, { x: -25, y: 25 }, { x: -25, y: -25 }];

   // The drawings orientation (before transforms) is: 
   //   emitter at the top
   //   collector at the bottom
   //   base to the right
   bodyGroup.append(

      //Highlight
      makePath(bodyJoints, "highlight highlightwithfill extrathick"),
      //Main body triangle
      makePath(bodyJoints, "body white"),

      //Plus
      makeLine({ x: -22, y: -10 }, { x: -14, y: -10 }, "line thin"),
      makeLine({ x: -18, y: -6 }, { x: -18, y: -14 }, "line thin"),

      //Minus
      makeLine({ x: -22, y: +10 }, { x: -14, y: +10 }, "line thin"),
   );


   // Image centre does not take base into account
   // Is always directly between the emitter and collector
   let centre = vector(pow1End, pow2End).centre().vector;

   // all angles are relative to the x-axis, hence in default orientation:
   //   when no rotation is required, angleEmitterCentre = 90, 
   let angleCentreBase = vector(centre).getAngleTo(outEnd);
   let angleInPInN = vector(pow1End).getAngleTo(pow2End);

   let rotation = angleInPInN - 90;

   // Don't ask.
   let scale = (((angleInPInN - angleCentreBase + 360) % 360) > 180)
      ? { x: -1 }
      : { x: 1 };

   // Only the start of the connections should be transformed, 
   // the ends should be absolute.
   // (Hence using vector transforms, not svg transforms)
   let [inPStart, inNStart, outStart, powPStart, powNStart]: Vector[] = vector(
      { x: -25, y: -10 }, { x: -25, y: 10 }, { x: 25, y: 0 }, { x: 0, y: -13 }, { x: 0, y: 13 }
   ).scaleWith(scale).rotate(rotation).sumWith(centre).vectors;


   let joints = [
      [inPStart, inPEnd],
      [inNStart, inNEnd],
      [outStart, outEnd],
      [powPStart, pow1End],
      [powNStart, pow2End],
   ]

   return [
      bodyGroup.translate(centre).rotate(rotation).scale(scale, false),
      makePath(joints, "line thin"),
   ];
}

