namespace Svg {
   export function addTransform(
      element: SVGGraphicsElement,
      transformationFunction: (transform: SVGTransform) => void,
      insertBefore: boolean = true
   ) {
      let transform = makeTransform();
      transformationFunction(transform);
      let transforms = element.transform.baseVal;
      if (insertBefore) {
         transforms.insertItemBefore(transform, 0);
      } else {
         transforms.appendItem(transform);
      }
      transforms.consolidate();
   }

   function makeTransform(): SVGTransform {
      return makeSVGElement<SVGSVGElement>("svg").createSVGTransform();
   }
}
