namespace Svg.Addins.Draggable {
   export const init = (element: Svg.Element, options: draggableOptions = {}): void => {
      // Allow an object to be dragged.
      // Set the drag event to occur on another target, but apply the drag to yourself
      let eventTarget = options.eventTarget !== undefined ? options.eventTarget : element.element;

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
               element.addClasses(styleClass);

               //Enable grid snapping, the default grid will snap to board holes
               if (grid !== "off") {
                  let gridSvg = element.convertVector(grid, "SvgToDom", "absToDoc");
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
               let dragChangeSvg = element.convertVector(dragChangeDom, "DomToSvg", "absToDoc");

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
               $(element.element).removeClass(styleClass);
               element.element.transform.baseVal.consolidate();
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
               element.translate(drag, true);
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
}

