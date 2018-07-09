namespace Svg.Elements {
   export class Group extends Svg.Element {
      children: Group[] = [];
      followers: Group[] = [];
      visualChildren: Svg.Element[] = [];
      // element: SVGGElement;
      constructor(classes: string = "") {
         super("g", classes);
      }

      //TODO
      remove() {
         if (this.parent !== undefined) {
            this.parent.children = this.parent.children.filter(c => c !== this);
         }
         $(this.element).remove();
      }

      append(elements: Svg.Element | Svg.Element[]): this {
         // this.element.appendChild(element.element);
         // To allow method chaining;
         return this._addChildren(elements, (element: SVGElement) => {
            this.element.appendChild(element);
         });
      }

      //Note when given an array, the z-order is not reversed.
      prepend(elements: Svg.Element | Svg.Element[]): this {
         // this.element.insertBefore(element.element, this.element.firstChild);
         // To allow method chaining;
         let firstChild = this.element.firstChild;
         return this._addChildren(elements, (element: SVGElement) => {
            this.element.insertBefore(element, firstChild);
         });
      }

      private _addChildren(
         elements: Svg.Element | Svg.Element[],
         addCallback: (element: SVGElement) => void
      ): this {
         elements = elements instanceof Array ? elements : [elements];
         elements.map(element => {
            addCallback(element.element);

            if (element instanceof Group) {
               if (element.parent !== undefined) {
                  element.parent.children = element.parent.children.filter(c => c !== element);
               }
               this.children.push(element);
            } else {
               this.visualChildren.push(element);
            }
            element.parent = this;
         });

         // To allow method chaining;
         return this;
      }

      moveTo(
         destination: Group,
         order: "append" | "prepend" = "append",
         //keepVisualScale = true
      ): this {
         if (this.parent !== undefined) {
            let oldParent = this.parent.element;
            let newParent = destination.element;

            let oldParentTransformMatrix = (oldParent.getScreenCTM() || Svg.makeMatrix());

            let newParentTransformMatrixInverse = (newParent.getScreenCTM() || Svg.makeMatrix()).inverse();

            // We want the scale to remain the same (but not visually)

            let dragGroupTransforms = this.element.transform.baseVal;

            dragGroupTransforms.insertItemBefore(
               dragGroupTransforms.createSVGTransformFromMatrix(oldParentTransformMatrix),
               0
            );
            dragGroupTransforms.insertItemBefore(
               dragGroupTransforms.createSVGTransformFromMatrix(newParentTransformMatrixInverse),
               0
            );
         }

         if (order === "append") {
            destination.append(this);
         } else {
            destination.prepend(this);
         }

         return this;
      }

      bumpToGrid(gridSpacing: number): this {
         let transforms = this.element.transform.baseVal;
         transforms.consolidate();
         if (transforms.numberOfItems === 1) {
            let transform = transforms.getItem(0).matrix;
            let xGrid = Math.round(transform.e / gridSpacing) * gridSpacing;
            let yGrid = Math.round(transform.f / gridSpacing) * gridSpacing;
            let xRem = xGrid - transform.e;
            let yRem = yGrid - transform.f;

            this.translate({
               X: xRem,
               Y: yRem
            },
               true
            );
         }
         return this;
      }

      clear(inclusionSelector: string = "*") {
         let element = this.element;
         $(element).children(inclusionSelector).remove();
      }

      clearVisuals(inclusionSelector: string = "*") {
         this.visualChildren = this.visualChildren.filter(c => {
            if ($(c.element).is(inclusionSelector)) {
               c.element.remove();
               return false;
            } else {
               return true;
            }
         });
      }



      // Add double click event to group
      setDoubleClickable(options: doubleClickOptions): this {
         // Set the event to occur on another target, but apply the effect to yourself
         let eventTarget = options.eventTarget !== undefined ? options.eventTarget : this.element;

         // The event...
         $(eventTarget).dblclick((event) => {
            //Don't apply event to elements underneath this one. TODO
            event.stopPropagation();
            options.response(event);
         });

         // To allow method chaining;
         return this;
      }

      //TODO
      setHoverable(options: hoverOptions = {}): this {
         // Set the event to occur on another target, but apply the effect to yourself
         let eventTarget = options.eventTarget || this.element;

         if (options.responseMouseEnter !== undefined) {
            $(eventTarget).mouseenter(event => {
               if (options.responseMouseEnter) options.responseMouseEnter(event);
            });
         }

         if (options.responseMouseLeave !== undefined) {
            $(eventTarget).mouseleave(event => {
               if (options.responseMouseLeave) options.responseMouseLeave(event);
            });
         }

         if (options.responseMouseMove !== undefined) {
            $(eventTarget).mousemove(event => {
               if (options.responseMouseMove) options.responseMouseMove(event);
            });
         }

         // To allow method chaining;
         return this;
      }

      setSingleClickable(options: singleClickOptions = {}): this {
         // Set the event to occur on another target, but apply the effect to yourself
         let eventTarget = options.eventTarget !== undefined ? options.eventTarget : this.element;


         if (options.onDown !== undefined) {
            $(eventTarget).mousedown(event => {
               if (options.onDown) options.onDown(event);
            });
         }

         if (options.onUp !== undefined) {
            $(eventTarget).mouseup(event => {
               if (options.onUp) options.onUp(event);
            });
         }

         if (options.onClick !== undefined) {
            $(eventTarget).click(event => {
               if (options.onClick) options.onClick(event);
            });
         }

         // To allow method chaining;
         return this;
      }

      // TODO Change this to set scrollable and make default behaviour zoom (for consistency)
      //Allow an object to be scaled
      //Probably only used on the top level group for zooming, but may work elsewhere too. Untested.
      setScalable(options: scalableOptions = {}): this {
         // Set the event to occur on another target, but apply to yourself
         let eventTarget = options.eventTarget !== undefined ? options.eventTarget : this.element;

         // Scale occurs on mousewheel
         let mouseWheelHandler = (e: WheelEvent) => {
            // Prevent scaling if a drag is in progress
            // Grid size is calculated on dragstart and will get messed up
            if (e.buttons === 1 || e.buttons === 3) {
               return;
            }

            // Change scale by +/-0.05 on each step depending on wheel direction
            let scaleChange = Math.sign(e.wheelDelta) * 0.05;

            // Find the postion and size of the element on screen
            let clientBounds = this.element.getBoundingClientRect();

            // Find the position relative to the SVG position
            let owner = this.element.ownerSVGElement;
            let rootClientBounds = (owner) ? owner.getBoundingClientRect() : {
               left: 0,
               top: 0
            };
            let clientStart = {
               X: clientBounds.left - rootClientBounds.left,
               Y: clientBounds.top - rootClientBounds.top
            };

            // Find the elements relative position in its own coordinate system
            let svgStart = this.convertVector(clientStart, "DomToSvg", "absToDoc");
            let svgSize = this.convertVector({
               X: clientBounds.width,
               Y: clientBounds.height
            },
               "DomToSvg",
               "absToDoc"
            );

            // Find the position of the mouse relative to the centre of the element on screen
            let mousePosDomFromCentre: Global.Types.vector = {
               X: e.clientX - (clientBounds.left + clientBounds.width / 2),
               Y: e.clientY - (clientBounds.top + clientBounds.height / 2)
            };

            // Find the position of the mouse relative to the centre of the element in its own coordinate system
            let mousePosSvgFromCentre = this.convertVector(
               mousePosDomFromCentre,
               "DomToSvg",
               "absToDoc"
            );

            // Perform the scale
            let scale = {
               X: 1 + scaleChange,
               Y: 1 + scaleChange
            };
            this.scale(scale, true);

            // Work out the translation required to keep the element under the mouse
            let scaleTranslationAdjust = {
               X: (svgStart.X + svgSize.X / 2 + mousePosSvgFromCentre.X) * -scaleChange,
               Y: (svgStart.Y + svgSize.Y / 2 + mousePosSvgFromCentre.Y) * -scaleChange
            };
            // Translate
            this.translate(scaleTranslationAdjust, true);

            if (options.onScale !== undefined) {
               options.onScale(scale, scaleTranslationAdjust);
            }
         };

         // Add event listeners for mousewheel
         // Typescript definitions for addEventListener are incorrect (as any surpresses warning)
         eventTarget.addEventListener("DOMMouseScroll", (e) => mouseWheelHandler(e as WheelEvent), {
            passive: true
         }); // For Firefox
         eventTarget.addEventListener("mousewheel", (e) => mouseWheelHandler(e as WheelEvent), {
            passive: true
         }); // For everyone else


         // To allow method chaining;
         return this;
      }
   }

   interface scalableOptions {
      eventTarget?: SVGGElement;
      onScale?: (scale: Global.Types.vector, translation: Global.Types.vector) => void;
   }

   interface doubleClickOptions {
      response: (event: JQueryEventObject) => void;
      eventTarget?: SVGGElement;
   }

   interface singleClickOptions {
      onDown?: (e?: JQueryMouseEventObject) => void;
      onUp?: (e?: JQueryMouseEventObject) => void;
      onClick?: (e?: JQueryMouseEventObject) => void;
      eventTarget?: SVGGElement;
   }

   interface hoverOptions {
      // Fires when the mouse moves into the object, but not when it moves within the objects
      responseMouseEnter?: ((event: JQueryMouseEventObject, extra?: any) => void);
      // Fires whenever the mouse moves within the object
      responseMouseMove?: ((event: JQueryMouseEventObject, extra?: any) => void);
      // Fires when the mouse moves out of the object
      responseMouseLeave?: ((event: JQueryMouseEventObject, extra?: any) => void);
      eventTarget?: SVGGElement;
   }
}