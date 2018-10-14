namespace Svg.Element.Group.Wire.Schematic {
   export type type = ReturnType<typeof make>;
   export function make(joints: Vector[], classes: string = "") {
      return [
         Svg.Element.Path.make(joints, "line thin")
      ];
   }
}

