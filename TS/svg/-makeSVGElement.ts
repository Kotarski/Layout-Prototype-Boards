namespace Svg {
   export function makeSVGElement<T extends SVGElement>(type: string, classes: string = "") {
      const element = document.createElementNS(Constants.svgURI, type) as T;
      $(element).addClass(classes);
      return element;
   }
}

