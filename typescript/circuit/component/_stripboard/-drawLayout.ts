import { StripboardLayout } from "./~classes";
import vector from "../../../-vector";
import { INDEXCENTRE, INDEXROTATION } from "./constants";

import { make as makeGroup } from "../../../svg/element/+group";
import { make as makeRect } from "../../../svg/element/+rect";
import { gridSpacing } from "../../../~constants";
import makeTracks from "./-makeTracks";


export default function drawLayout(instance: StripboardLayout) {
   const bodyGroup = makeGroup("body");

   const rotation = vector(instance.joints[INDEXCENTRE]).getAngleTo(instance.joints[INDEXROTATION]);
   instance.tracks = makeTracks(instance)

   const size = {
      width: (instance.columns + 0.5) * gridSpacing,
      height: (instance.rows + 0.5) * gridSpacing
   };
   const cornerRounding = { x: 3, y: 3 };

   bodyGroup.append(
      makeRect(vector(0), size, cornerRounding, "body highlight").translate(instance.joints[INDEXCENTRE]).rotate(rotation),
      instance.tracks.map(t => t.group)
   );

   return bodyGroup;
}