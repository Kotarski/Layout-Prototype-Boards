import { OpAmpLayout } from "./~classes";
import vector from "../../../-vector";
import { INDEXCENTRE, INDEXROTATION } from "./constants";

import { makeDip as makeDip } from "../../../svg/element/groups/+dip";

export default function drawLayout(instance: OpAmpLayout) {

   const centre = instance.states.joints[INDEXCENTRE];
   const rotationPoint = instance.states.joints[INDEXROTATION];

   const rotation = vector(centre).getAngleTo(rotationPoint);

   //TODO Make DIP draw in centre? So this can be tidied.
   if (instance.states.isDual) {
      return makeDip(4, "", "TL072", "").translate(vector(-30)).rotate(rotation, vector(30)).translate(centre);
   } else {
      return makeDip(4, "", "TL071", "").translate(vector(-30)).rotate(rotation, vector(30)).translate(centre);
   }
}
