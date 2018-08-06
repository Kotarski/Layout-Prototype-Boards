namespace Svg.Element.Group.Power.Layout {
   export type type = ReturnType<typeof make>;
   export function make(voltage: number, connection: Vector, classes: string = "") {
      const bodyGroup = Group.make(classes);

      let text = voltage.toFixed(1);

      bodyGroup.append(
         Svg.Element.Rect.make({ x: 0, y: -35 }, { width: 180, height: 95 }, { x: 10, y: 10 }, "body highlight"),
         Svg.Element.Rect.make({ x: 0, y: -45 }, { width: 160, height: 65 }, { x: 10, y: 10 }, "screen"),
         Svg.Element.Text.make("8".repeat(text.length - 1), { x: 0, y: -20 }, "screentext off"),
         Svg.Element.Text.make(text, { x: 0, y: -20 }, "screentext on"),
         Svg.Element.Circle.make({ x: 0, y: 0 }, 5, "hole")
      );

      return [
         bodyGroup.translate(connection)
      ];
   }
}


