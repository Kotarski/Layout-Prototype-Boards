import { Functions as ElementFunctions } from "./+element";
import { Functions as GroupFunctions } from "./element/+group";
import { Functions as TextFunctions } from "./element/+text";

export default function svg<T extends SVGElement>(element: T) {

   let extension = {
      element: element
   }

   let elementExtension = (element instanceof SVGGraphicsElement) ? {
      rotate: ElementFunctions.rotate(element),
      translate: ElementFunctions.translate(element),
      scale: ElementFunctions.scale(element),
      getTransforms: ElementFunctions.getTransforms(element),
      setTransforms: ElementFunctions.setTransforms(element),
      convertVector: ElementFunctions.convertVector(element),
      clipTo: ElementFunctions.clipTo(element),
   } : null;

   let groupExtension = (element instanceof SVGGElement || element instanceof SVGSVGElement) ? {
      append: GroupFunctions.append(element),
      prepend: GroupFunctions.prepend(element),
      clearChildren: GroupFunctions.clearChildren(element)
   } : null;

   let textExtension = (element instanceof SVGTextElement) ? {
      followPath: TextFunctions.followPath(element),
      rotatePosition: TextFunctions.rotatePosition(element),
   } : null;

   return Object.assign({}, extension, elementExtension, groupExtension, textExtension) as (
      (typeof extension) &
      (T extends SVGGraphicsElement ? NonNullable<typeof elementExtension> : {}) &
      (T extends SVGGElement | SVGSVGElement ? NonNullable<typeof groupExtension> : {}) &
      (T extends SVGTextElement ? NonNullable<typeof textExtension> : {})
   )
}


