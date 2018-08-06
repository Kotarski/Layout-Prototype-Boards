function svg<T extends SVGElement>(element: T) {

   let extension = {
      element: element
   }

   let elementExtension = (element instanceof SVGGraphicsElement) ? {
      rotate: Svg.Element.Functions.rotate(element),
      translate: Svg.Element.Functions.translate(element),
      scale: Svg.Element.Functions.scale(element),
      getTransforms: Svg.Element.Functions.getTransforms(element),
      setTransforms: Svg.Element.Functions.setTransforms(element),
      convertVector: Svg.Element.Functions.convertVector(element),
   } : null;

   let groupExtension = (element instanceof SVGGElement || element instanceof SVGSVGElement) ? {
      append: Svg.Element.Group.Functions.append(element),
      prepend: Svg.Element.Group.Functions.prepend(element),
      clearChildren: Svg.Element.Group.Functions.clearChildren(element)
   } : null;

   let textExtension = (element instanceof SVGTextElement) ? {
      followPath: Svg.Element.Text.Functions.followPath(element),
      rotatePosition: Svg.Element.Text.Functions.rotatePosition(element),
   } : null;

   return Object.assign({}, extension, elementExtension, groupExtension, textExtension) as (
      (typeof extension) &
      (T extends SVGGraphicsElement ? NonNullable<typeof elementExtension> : {}) &
      (T extends SVGGElement | SVGSVGElement ? NonNullable<typeof groupExtension> : {}) &
      (T extends SVGTextElement ? NonNullable<typeof textExtension> : {})
   )
}


