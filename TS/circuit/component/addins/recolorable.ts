namespace Circuit.Component.Addins.Recolorable {

   type colorPalette = string[];
   type recolorableComponent = Component.Instance & { color: string };

   export const init = (
      component: recolorableComponent,
      where: () => Vector,
      recolorSelector: string = "*",
      colorPalette: colorPalette = defaultColorPalette
   ) => {
      const element = component.group.element;

      $(element).on(Events.select, () => {
         createRecolorHandle(component, where(), recolorSelector, colorPalette);
      });
      $(element).on(Events.draw, () => {
         clearRecolorHandle(component);
         createRecolorHandle(component, where(), recolorSelector, colorPalette);
      });
      $(element).on(Events.deselect, () => {
         clearRecolorHandle(component);
      });
   }

   const refreshComponent = (component: recolorableComponent) => {
      component.group.clearChildren(":not(.handle,.connectivityhighlight)");
      component.makeConnectors();
      $(component.group.element).trigger(Events.draw);
   };

   const createRecolorHandle = (component: recolorableComponent, position: Vector, recolorSelector: string, colorPalette: colorPalette) => {

      let recolorSegmentGroup = Svg.Element.Group.make("recolorSegmentGroup");
      let recolorHandle = Svg.Element.Circle.make(position, 7, "handle recolorHandle");

      //Segments
      let segment1 = Svg.Element.Rect.make(
         position, { width: 10, height: 20 }, undefined, "recolorHandleSegment"
      ).rotate(45, position).translate({ x: -4, y: -4 });
      let segment2 = Svg.Element.Rect.make(
         position, { width: 10, height: 20 }, undefined, "recolorHandleSegment"
      ).rotate(45, position).translate({ x: 4, y: 4 });

      $(segment1.element).css("fill", "#4fd56b");
      $(segment2.element).css("fill", "#d54f6b");


      recolorSegmentGroup.append(segment1, segment2)

      component.group.append(recolorHandle, recolorSegmentGroup);

      $(recolorHandle.element).on("click", () => {
         let colorIndex = colorPalette.indexOf(component.color);
         let color: string;
         if (colorIndex >= 0) {
            color = colorPalette[(colorIndex + 1) % colorPalette.length];
         } else {
            color = colorPalette[0];
         };
         component.color = color;
         refreshComponent(component);
      })
   }

   const clearRecolorHandle = (component: recolorableComponent) => {
      $(component.group.element).find(".recolorHandle").remove();
      $(component.group.element).find(".recolorSegmentGroup").remove();
   }

   const defaultColorPalette: colorPalette = [
      "#545454", //"Black"
      "red",
      "#7575FF", // Blue
      "#946857", // Brown
      "#55DD55", // Green
      "#FFEF00", // Yellow
      "pink"
   ]

}