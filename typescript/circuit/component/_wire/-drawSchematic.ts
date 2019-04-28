import { WireSchematic } from "./~classes";

import { makePath as makePath } from "../../../svg/element/+path";

export default function drawSchematic(instance: WireSchematic) {
   return [
      makePath(instance.states.joints, "line thin")
   ];
}

