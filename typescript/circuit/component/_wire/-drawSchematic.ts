import { Schematic } from "./~classes";

import { makePath as makePath } from "../../../svg/element/+path";

export default function drawSchematic(instance: Schematic) {
   return [
      makePath(instance.joints, "line thin")
   ];
}

