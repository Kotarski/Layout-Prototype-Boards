namespace Circuit.Component._OpAmp {
   export function drawLayout(instance: Classes.Layout) {

      const centre = instance.joints[INDEXCENTRE];
      const rotationPoint = instance.joints[INDEXROTATION];

      const rotation = vector(centre).getAngleTo(rotationPoint);

      //TODO Make DIP draw in centre? So this can be tidied.
      if (instance.isDual) {
         return Svg.Element.Group.Dip.make(4, "", "TL072", "").translate(vector(-30)).rotate(rotation, vector(30)).translate(centre);
      } else {
         return Svg.Element.Group.Dip.make(4, "", "TL071", "").translate(vector(-30)).rotate(rotation, vector(30)).translate(centre);
      }
   }
}