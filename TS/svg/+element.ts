
namespace Svg.Element {

   export function make<T extends SVGElement>(type: string, classes: string = "") {
      const element = document.createElementNS(Constants.svgURI, type) as T;
      $(element).addClass(classes);
      return element;
   }

   export namespace Functions {

      export function rotate<T extends SVGGraphicsElement>(element: T) {
         return (rotation: number, centre?: Global.Types.vector, insertBefore: boolean = false) => {
            let centreV: Global.Types.vector;
            if (centre) {
               centreV = centre;
            } else {
               let bounds = element.getBBox();
               centreV = { x: bounds.width / 2 + bounds.x, y: bounds.height / 2 + bounds.y };
            }

            addTransform(element, t => t.setRotate(rotation, centreV.x, centreV.y), insertBefore);

            return svg(element);
         }
      }

      export function translate<T extends SVGGraphicsElement>(element: T) {
         return (translation: Global.Types.vector, insertBefore: boolean = true) => {
            addTransform(element, t => t.setTranslate(translation.x, translation.y), insertBefore)
            return svg(element);
         }
      }

      export function scale<T extends SVGGraphicsElement>(element: T) {
         return (scale: (Global.Types.vector | number), insertBefore: boolean = true) => {
            let scaleV = (typeof scale === "number") ? { x: scale, y: scale } : scale;
            addTransform(element, t => t.setScale(scaleV.x, scaleV.y), insertBefore)
            return svg(element);
         }
      }

      export function getTransforms<T extends SVGGraphicsElement>(element: T) {
         return () => {
            let transform = element.transform.baseVal.consolidate();
            return (transform === null) ? Svg.makeMatrix() : {
               a: transform.matrix.a, b: transform.matrix.b, c: transform.matrix.c,
               d: transform.matrix.d, e: transform.matrix.e, f: transform.matrix.f
            }
         }
      }

      export function setTransforms<T extends SVGGraphicsElement>(element: T) {
         return (transformMatrix: Types.transformMatrix) => {
            element.transform.baseVal.clear();
            element.removeAttribute('transform');

            let matrix = makeMatrix();
            matrix.a = transformMatrix.a;
            matrix.b = transformMatrix.b;
            matrix.c = transformMatrix.c;
            matrix.d = transformMatrix.d;
            matrix.e = transformMatrix.e;
            matrix.f = transformMatrix.f;
            let transform = element.transform.baseVal.createSVGTransformFromMatrix(matrix);
            element.transform.baseVal.appendItem(transform);
            return svg(element);
         }
      }

      // Converts vectors between the Dom and SVG frame of reference
      // Generally will want to use relative for sizes (or drags) and absolute for the rest
      export function convertVector<T extends SVGGraphicsElement>(element: T) {

         return (vector: Global.Types.vector, direction: "DomToSvg" | "SvgToDom", type: "relToGroup" | "absToDoc"): Global.Types.vector => {
            // Matrix representing transforms from element coordinates to dom coordinates
            // (It actually converts to the SVGs viewport, but that is unused and will be same as DOM)
            let conversionMatrix = element.getScreenCTM() || Svg.makeMatrix();

            // Inverts the matrix (to convert the other way)
            if (direction === "DomToSvg") conversionMatrix = conversionMatrix.inverse();

            // Reverses the transforms which could cause transformations on the reference frame...
            // In practice, this means top left will always be top left,
            // A rotation of 90(deg) will not cause a top left dom coordinate to
            // convert to the top right of the group and a rightwards drag to convert to a downwards drag
            if (type === "absToDoc" && element.transform.baseVal.numberOfItems > 0) {
               element.transform.baseVal.consolidate();
               let groupMatrix = element.transform.baseVal.getItem(0).matrix;
               conversionMatrix = conversionMatrix.multiply(groupMatrix);
            }

            // Apply rotational/scale conversions
            let convertedVector = {
               x: vector.x * conversionMatrix.a + vector.y * conversionMatrix.c,
               y: vector.y * conversionMatrix.d + vector.x * conversionMatrix.b
            };

            // If relative then also apply the translations...
            if (type === "relToGroup") {
               convertedVector.x += conversionMatrix.e;
               convertedVector.y += conversionMatrix.f;
            }

            return convertedVector;
         }
      }
   }
}