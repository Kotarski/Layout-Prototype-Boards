namespace Circuit.Component._Power {
   export function drawLayout(instance: Classes.Layout) {
      const bodyGroup = Svg.Element.Group.make("body");

      const text = instance.voltage.toFixed(1);

      bodyGroup.append(
         Svg.Element.Rect.make({ x: 0, y: -35 }, { width: 180, height: 95 }, { x: 10, y: 10 }, "body highlight"),
         Svg.Element.Rect.make({ x: 0, y: -45 }, { width: 160, height: 65 }, { x: 10, y: 10 }, "screen"),
         Svg.Element.Text.make("8".repeat(text.length - 1), { x: 0, y: -20 }, "screentext off"),
         Svg.Element.Text.make(text, { x: 0, y: -20 }, "screentext on"),
         Svg.Element.Circle.make({ x: 0, y: 0 }, 5, "hole")
      );

      return [
         bodyGroup.translate(instance.joints[INDEXCONNECTION])
      ];
   }
}