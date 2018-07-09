namespace Svg {
   export class Element {
      element: SVGGraphicsElement;
      parent: Elements.Group | undefined;
      constructor(type: string, classes: string = "") {
         this.element = document.createElementNS(Constants.svgURI, type) as SVGGraphicsElement;
         $(this.element).addClass(classes);
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

      //TODO?
      intersectsWith(item: Element | SVGSVGElement | ClientRect, tolerance: "touch" | "contains" | "containedBy") {
         let a = this.element.getBoundingClientRect();

         let b;
         if (item instanceof SVGSVGElement) {
            b = item.getBoundingClientRect();
         } else if (item instanceof Element) {
            b = item.element.getBoundingClientRect();
         } else {
            // Assume its a client rect
            b = item;
         }

         if (tolerance === "touch") {
            // Test if one is completely outside the other and invert
            let isOutside =
               (b.left > a.right) ||
               (b.right < a.left) ||
               (b.top > a.bottom) ||
               (b.bottom < a.top);

            return !isOutside;
         } else {
            if (tolerance === "containedBy") {
               let c = b;
               b = a;
               a = c;
            }

            let isInside =
               (b.left >= a.left) &&
               (b.right <= a.right) &&
               (b.top >= a.top) &&
               (b.bottom <= a.bottom);

            return isInside;
         }
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

      // Allow an object to be dragged.
      setDraggable(options: draggableOptions = {}): this {
         // Set the drag event to occur on another target, but apply the drag to yourself
         let eventTarget = options.eventTarget !== undefined ? options.eventTarget : this.element;

         // The default grid will snap to board holes, the option can prevent this or redefine the size
         // TODO USE CONSTANT
         let grid = options.grid !== undefined ? options.grid : {
            X: 10,
            Y: 10
         };

         // Changes the draggables position in the document tree, default is to not
         // let moveToTop = (options.moveToTop !== undefined) ? (options.moveToTop) : "no";

         // Styles the draggable
         let styleClass = options.styleClass !== undefined ? options.styleClass : "dragging";

         let lastPosition: Global.Types.vector;

         // Set to draggable (JQuery UI)
         if ($(eventTarget).draggable("instance") === undefined) {
            $(eventTarget).draggable({
               //On drag start
               start: (event, ui) => {
                  // Add class for visual feedback (opacity)
                  this.addClasses(styleClass);

                  //Enable grid snapping, the default grid will snap to board holes
                  if (grid !== "off") {
                     let gridSvg = this.convertVector(grid, "SvgToDom", "absToDoc");
                     $(eventTarget).draggable("option", "grid", [gridSvg.X, gridSvg.Y]);
                  }

                  // Simulate drag for matching children (to attach component pins etc)
                  // if (options.dropChildren !== undefined) {
                  //   $(eventTarget).data('draggedChildren', $(this.element).children(options.dropChildren));
                  // }

                  lastPosition = {
                     X: ui.originalPosition.left,
                     Y: ui.originalPosition.top
                  };
               },
               //On each drag step
               drag: (event, ui) => {
                  // Amount dragged on this step (In DOM coordinate system)
                  //console.log(lastPosition);

                  let dragChangeDom = {
                     X: ui.position.left - lastPosition.X,
                     Y: ui.position.top - lastPosition.Y
                  };
                  // Convert amount dragged this step to the coordinate system of the svg element
                  let dragChangeSvg = this.convertVector(dragChangeDom, "DomToSvg", "absToDoc");

                  //Call constraint functions (via a custom event listener
                  $(eventTarget).triggerHandler("dragSVGConstraintCheck", [
                     ui,
                     dragChangeSvg,
                     dragChangeDom
                  ]);

                  lastPosition = {
                     X: ui.position.left,
                     Y: ui.position.top
                  };

                  //Call on drag functions (via a custom event listener
                  //so we can keep the svg drag values
                  $(eventTarget).trigger("dragSVG", [ui, dragChangeSvg]);

               },
               //On drag stop
               stop: (event, ui) => {
                  // Remove class for visual feedback (opacity)
                  $(this.element).removeClass(styleClass);
                  this.element.transform.baseVal.consolidate();
               }
            });
         }

         if (options.onDrag !== undefined) {
            $(eventTarget).on("dragSVG", (e, ui, drag) => {
               if (options.onDrag) options.onDrag(drag, e);
            });
         };

         // Translate by dragged amount if movement not disabled
         if (options.disableMovement !== true) {
            $(eventTarget).on("dragSVG", (e, ui, drag) => {
               if ($(e.target).closest(".ui-draggable").is(eventTarget)) {
                  this.translate(drag, true);
               }
            });
         }

         if (options.constrainWith !== undefined) {
            $(eventTarget).on(
               "dragSVGConstraintCheck",
               (e, ui, dragSvg: Global.Types.vector, dragDom: Global.Types.vector) => {
                  // If both components of the drag are too much...
                  if (options.constrainWith) if (options.constrainWith(dragSvg)) {
                     // Don't let it move
                     dragSvg.X = 0;
                     dragSvg.Y = 0;
                     ui.position.top = lastPosition.Y;
                     ui.position.left = lastPosition.X;
                  }
               }
            );
         }
         if (options.onStart !== undefined) {
            $(eventTarget).on("dragstart", (e, ui) => {
               if (options.onStart) options.onStart(e);
            });
         }

         if (options.onStop !== undefined) {
            $(eventTarget).on("dragstop", (e, ui) => {
               if (options.onStop) options.onStop(e);
            });
         }

         // When dragging internal svg elements, JQueryUI does not know how to move them.
         // This is done manually in the ondrag handler ^
         // For the top level group, the SVG element is used as the target as the
         // group does not fill the pane.
         // JQueryUI knows how to drag the SVG element and will do so. This is
         // undesirable as only the view needs to change.
         // Using a helper prevents the SVG being moved on the page.
         if (options.useHelper === true) {
            $(eventTarget).draggable("option", "helper", () => document.createElement("div"));
         }

         // Passes 'this (the group)' into the event data for retrieval by a droppable
         // Also helpful for debugging
         $(eventTarget).data("group", this);

         // Passes any additional data into the event
         $(eventTarget).data("data", options.data);

         // To allow method chaining;
         return this;
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

      remove() {
         // Check implementation in child classes
         $(this.element).remove();
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

interface draggableOptions {
   disableMovement?: boolean; //All other options ignored if this is true
   onDrag?: (drag: Global.Types.vector, e?: JQueryEventObject) => void;
   onStop?: (e?: JQueryEventObject) => void;
   onStart?: (e?: JQueryEventObject) => void;
   constrainWith?: (drag: Global.Types.vector, e?: JQueryEventObject) => boolean;
   useHelper?: boolean;
   eventTarget?: SVGGraphicsElement | SVGGraphicsElement[];
   grid?: Global.Types.vector | "off";
   styleClass?: string;
   data?: any;
}