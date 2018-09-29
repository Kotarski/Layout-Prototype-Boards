namespace Circuit.Component._Wire {
   export function drawSchematic(instance: Classes.Schematic) {
      return [
         Svg.Element.Path.make(instance.joints, "line thin")
      ];
   }
}
