/// <reference path="../+dip.ts" />

namespace Svg.Element.Group.OpAmp.Layout {
   export type type = ReturnType<typeof make>;
   export function make(isDual: boolean, classes: string = "") {
      if (isDual) {
         return Svg.Element.Group.Dip.make(4, "", "TL072", "");
      } else {
         return Svg.Element.Group.Dip.make(4, "", "TL071", "");
      }
   }
}