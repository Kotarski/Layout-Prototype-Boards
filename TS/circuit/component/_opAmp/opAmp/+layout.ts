/// <reference path="../+dip.ts" />

namespace Svg.Element.Group.OpAmp.Layout {
   export type type = ReturnType<typeof make>;
   export function make(isDual: boolean, centre: Vector, rotationPoint: Vector, classes: string = "") {
      let rotation = vector(centre).getAngleTo(rotationPoint);

      if (isDual) {
         return Svg.Element.Group.Dip.make(4, "", "TL072", "").translate(vector(-30)).rotate(rotation, vector(30)).translate(centre);
      } else {
         return Svg.Element.Group.Dip.make(4, "", "TL071", "").translate(vector(-30)).rotate(rotation, vector(30)).translate(centre);
      }

   }
}