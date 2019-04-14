import { StripboardLayout } from "./~classes";
import vector from "../../../-vector";
import { INDEXCENTRE, INDEXROTATION } from "./constants";

import { makeGroup as makeGroup } from "../../../svg/element/+group";
import { makeRect as makeRect } from "../../../svg/element/+rect";
import { gridSpacing } from "../../../~constants";
import makeTracks from "./-makeTracks";


export default function drawLayout(instance: StripboardLayout) {
   const bodyGroup = makeGroup("body");

   const rotation = vector(instance.states.joints[INDEXCENTRE]).getAngleTo(instance.states.joints[INDEXROTATION]);
   instance.tracks = makeTracks(instance)

   const size = {
      width: (instance.properties.columns + 0.5) * gridSpacing,
      height: (instance.properties.rows + 0.5) * gridSpacing
   };
   const cornerRounding = { x: 3, y: 3 };

   bodyGroup.append(
      makeRect(vector(0), size, cornerRounding, "body highlight").translate(instance.states.joints[INDEXCENTRE]).rotate(rotation),
      instance.tracks.map(t => t.group)
   );

   return bodyGroup;
}