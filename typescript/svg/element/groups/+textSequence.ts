import { Vector } from "../../../++types";
import { make as makeGroup } from "../+group";
import { make as makeText } from "../+text";

export type type = ReturnType<typeof make>;
export function make(
   start: Vector,
   gap: Vector,
   sequence: (string | number)[] | string | { start: number; length: number },
   classes: string = ""
) {
   const element = makeGroup(classes);

   let textArray: string[] = [];
   if (sequence instanceof Array) {
      // Converts to text (using 'String(val)')
      textArray = sequence.map(String);
   } else if (typeof sequence === "string") {
      textArray = sequence.split("");
   } else {
      // Its the object
      textArray = [...Array(sequence.length).keys()].map(v =>
         (v + sequence.start).toString()
      );
   }

   element.append(
      textArray.map((txt, i) =>
         makeText(txt, { x: gap.x * i, y: gap.y * i }, "text")
      )
   );

   element.translate(start);

   return element;
}
