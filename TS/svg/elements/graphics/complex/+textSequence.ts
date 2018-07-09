namespace Svg.Elements.Graphics.Complexes {
   export class TextSequence extends Graphics.Complex {
      constructor(start: Global.Types.vector, gap: Global.Types.vector, sequence: (string | number)[] | string | { start: number, length: number }, classes: string = "") {
         super(classes);

         let textArray: string[] = [];
         if (sequence instanceof Array) {
            // Converts to text (using 'String(val)')
            textArray = sequence.map(String);
         } else if (typeof sequence === "string") {
            textArray = sequence.split("");
         } else {
            // Its the object
            textArray = [...Array(sequence.length).keys()].map(v => (v + sequence.start).toString());
         }

         for (let [i, txt] of textArray.entries()) {
            this.element.appendChild(new Svg.Elements.Graphics.Simples.Text(
               txt, { X: gap.X * i, Y: gap.Y * i }, false, "text").element);
         }

         this.translate({
            X: start.X,
            Y: start.Y
         });
      }
   }
}
