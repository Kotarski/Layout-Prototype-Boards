import { Vector } from "../../../++types";
import { makeGroup as makeGroup } from "../+group";
import { makeText as makeText } from "../+text";

export type textseq = ReturnType<typeof makeTextSeq>;
export function makeTextSeq(
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
