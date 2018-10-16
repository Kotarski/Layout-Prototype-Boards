import { make as makeGroup } from "../+group";
import { make as makeText } from "../+text";
import { make as makePath } from "../+path";
import { make as makeRect } from "../+rect";

import { gridSpacing } from "../../../~constants";

export type type = ReturnType<typeof make>;
export function make(
   pinsPerSide: number = 4,
   textLineOne: string = "",
   textLineTwo: string = "",
   textLineThree: string = "",
   classes: string = ""
) {
   const element = makeGroup("dip" + classes);

   let bodySize = {
      width: gridSpacing * pinsPerSide,
      height: gridSpacing * 2.8
   }

   let centre = {
      x: gridSpacing * (pinsPerSide - 1) / 2,
      y: gridSpacing * 1.5
   };

   let pinString =
      "M " + (0) + " " + (-2.5)
      + "h " + (-4)
      + "v " + (3)
      + "l " + (1) + " " + (0.5)
      + "h " + (6)
      + "l " + (1) + " " + (-0.5)
      + "v " + (-3)
      + "Z";

   // let pinXBase = 0;
   for (let i = 0; i < pinsPerSide; i++) {
      element.append(
         makePath(pinString, "pin").scale({ x: 1, y: -1 }).translate({ x: gridSpacing * i, y: 0 }),
         makePath(pinString, "pin").translate({ x: gridSpacing * i, y: 3 * gridSpacing })
      );
   };

   let notchString =
      "M " + (-0.5 * gridSpacing) + " " + (centre.y) +
      "v " + (8) +
      "a " + (1) + " " + (1) + " " + (0) + " " + (0) + " " + (0) + " " + (0) + " " + (-16) +
      "Z";

   element.append(
      makeRect(centre, bodySize, { x: 5, y: 5 }, "body"),
      makePath(notchString, "notch"),
      makeRect(centre, bodySize, { x: 5, y: 5 }, "body highlight"),
      makeText(textLineOne, { x: 0.25 * gridSpacing, y: 1 * gridSpacing }, "text"),
      makeText(textLineTwo, { x: 0.25 * gridSpacing, y: 1.75 * gridSpacing }, "text"),
      makeText(textLineThree, { x: 0.25 * gridSpacing, y: 2.5 * gridSpacing }, "text")
   );
   return element;
}
