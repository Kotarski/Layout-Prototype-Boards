namespace Svg {
   export class Element {
      element: SVGGraphicsElement;
      constructor(type: string, classes: string = "") {
         this.element = makeSVGElement(type, classes);
      }

      //
      addClasses(classes: string) {
         $(this.element).addClass(classes);
         return this;
      }

      //
      removeClasses(classes: string) {
         $(this.element).removeClass(classes);
         return this;
      }

      clearChildren(inclusionSelector: string = "*") {
         let element = this.element;
         $(element).children(inclusionSelector).remove();
      }

      // Converts vectors between the Dom and SVG frame of reference
      // Generally will want to use relative for sizes (or drags) and absolute for the rest
      convertVector(
         vector: Global.Types.vector,
         direction: "DomToSvg" | "SvgToDom",
         type: "relToGroup" | "absToDoc"
      ): Global.Types.vector {
         // Matrix representing transforms from element coordinates to dom coordinates
         // (It actually converts to the SVGs viewport, but that is unused and will be same as DOM)
         let conversionMatrix = this.element.getScreenCTM() || Svg.makeMatrix();

         // Inverts the matrix (to convert the other way)
         if (direction === "DomToSvg") conversionMatrix = conversionMatrix.inverse();

         // Reverses the transforms which could cause transformations on the reference frame...
         // In practice, this means top left will always be top left,
         // A rotation of 90(deg) will not cause a top left dom coordinate to
         // convert to the top right of the group and a rightwards drag to convert to a downwards drag
         if (type === "absToDoc" && this.element.transform.baseVal.numberOfItems > 0) {
            this.element.transform.baseVal.consolidate();
            let groupMatrix = this.element.transform.baseVal.getItem(0).matrix;
            conversionMatrix = conversionMatrix.multiply(groupMatrix);
         }

         // Apply rotational/scale conversions
         let convertedVector = {
            X: vector.X * conversionMatrix.a + vector.Y * conversionMatrix.c,
            Y: vector.Y * conversionMatrix.d + vector.X * conversionMatrix.b
         };

         // If relative then also apply the translations...
         if (type === "relToGroup") {
            convertedVector.X += conversionMatrix.e;
            convertedVector.Y += conversionMatrix.f;
         }

         return convertedVector;
      }

      rotate(rotation: number, centre?: Global.Types.vector, insertBefore: boolean = false): this {

         // Default rotation point is the objects centre
         let bounds = this.element.getBBox();
         centre = (centre !== undefined) ? centre : {
            X: bounds.width / 2 + bounds.x,
            Y: bounds.height / 2 + bounds.y
         };

         let owner = this.element.ownerSVGElement;

         if (owner) {
            let transform = owner.createSVGTransform();
            transform.setRotate(rotation, centre.X, centre.Y);
            addTransform(this, transform, insertBefore)
         } else {
            addTextTransform(this, 'rotate', [rotation, centre.X, centre.Y], insertBefore)
         }

         return this;
      }

      translate(translation: Global.Types.vector, insertBefore: boolean = true): this {
         let owner = this.element.ownerSVGElement;

         if (owner) {
            let transform = owner.createSVGTransform();
            transform.setTranslate(translation.X, translation.Y);
            addTransform(this, transform, insertBefore)
         } else {
            addTextTransform(this, 'translate', [translation.X, translation.Y], insertBefore)
         }

         return this;
      }

      scale(scale: (Global.Types.vector | number), insertBefore: boolean = true): this {
         let owner = this.element.ownerSVGElement;
         if (typeof scale === "number") scale = { X: scale, Y: scale };
         if (owner) {
            let transform = owner.createSVGTransform();
            transform.setScale(scale.X, scale.Y);
            addTransform(this, transform, insertBefore)
         } else {
            addTextTransform(this, 'scale', [scale.X, scale.Y], insertBefore)
         }

         return this;
      }

      get transforms(): Types.transformMatrix {
         let transform = this.element.transform.baseVal.consolidate();
         return (transform === null) ? Svg.makeMatrix() : {
            a: transform.matrix.a, b: transform.matrix.b, c: transform.matrix.c,
            d: transform.matrix.d, e: transform.matrix.e, f: transform.matrix.f
         }
      }

      set transforms(transformMatrix: Types.transformMatrix) {
         this.element.transform.baseVal.clear();
         this.element.removeAttribute('transform');

         let matrix = makeMatrix();
         matrix.a = transformMatrix.a;
         matrix.b = transformMatrix.b;
         matrix.c = transformMatrix.c;
         matrix.d = transformMatrix.d;
         matrix.e = transformMatrix.e;
         matrix.f = transformMatrix.f;
         let transform = this.element.transform.baseVal.createSVGTransformFromMatrix(matrix);
         this.element.transform.baseVal.appendItem(transform);

      }
   }

   function addTextTransform(svg: Svg.Element, type: "rotate" | "translate" | "scale", values: number[], insertBefore: boolean) {
      let transforms = svg.element.getAttribute('transform') || "";
      let newTransform = type + "(" + values.join(" ") + ")";
      if (insertBefore) {
         svg.element.setAttribute('transform', newTransform + transforms);
      } else {
         svg.element.setAttribute('transform', transforms + newTransform);
      }
   }

   function addTransform(svg: Svg.Element, transform: SVGTransform, insertBefore: boolean = true) {
      let transforms = svg.element.transform.baseVal;
      if (insertBefore) {
         transforms.insertItemBefore(transform, 0);
      } else {
         transforms.appendItem(transform);
      }
      transforms.consolidate();
   }
}



