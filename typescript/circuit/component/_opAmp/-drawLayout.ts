import { Layout } from "./~classes";
import vector from "../../../-vector";
import { INDEXCENTRE, INDEXROTATION } from "./constants";

import { makeDip as makeDip } from "../../../svg/element/groups/+dip";

export default function drawLayout(instance: Layout) {

   const centre = instance.joints[INDEXCENTRE];
   const rotationPoint = instance.joints[INDEXROTATION];

   const rotation = vector(centre).getAngleTo(rotationPoint);

   //TODO Make DIP draw in centre? So this can be tidied.
   if (instance.isDual) {
      return makeDip(4, "", "TL072", "").translate(vector(-30)).rotate(rotation, vector(30)).translate(centre);
   } else {
      return makeDip(4, "", "TL071", "").translate(vector(-30)).rotate(rotation, vector(30)).translate(centre);
   }
}
