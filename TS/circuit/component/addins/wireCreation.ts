namespace Circuit.Component.Addins.WireCreation {
   type holeyComponent = Component.Instance & { connectorSets: Component.Types.hole[][] };


   export const init = (component: holeyComponent) => {
      // Hole elements will not exist at initialisation,
      // need to use component filtered by .hole selector
      $(component.group.element).on("mouseenter", ".hole", (mOE) => {
         // Set the hole as draggable if it isn't already
         if (!$(mOE.target).draggable('instance')) {
            Svg.Addins.Draggable.init(component.group.element, {
               eventTarget: mOE.target as SVGGraphicsElement,
               disableMovement: true,
               styleClass: ""
            });
            let dragHandle: SVGGraphicsElement;

            // We are hijacking the hole drag events, so it's important the real handlers don't fire
            // hence: e.stopPropagation();

            // Create the wire, select it, and grab a handle (any is fine)
            $(mOE.target).on(Events.dragStart, (e, ui, drag: Vector) => {
               e.stopPropagation();
               const position = Active.layout.group.convertVector({ x: e.clientX, y: e.clientY }, "DomToSvg", "relToGroup");
               const gridPosition = vector(position).snapToGrid().vector;
               const wire = createWireAtPoint(gridPosition);
               $(wire.group.element).trigger(Events.draw);
               dragHandle = $(wire.group.element).find(".dragHandle")[0] as any;
               $(dragHandle).trigger("mousedown");
            })

            // Pass the handlers to the wire
            $(mOE.target).on(Events.drag, (e, ui, drag: Vector) => {
               e.stopPropagation();
               $(dragHandle).trigger(Events.drag, [ui, drag]);
            });

            // Pass the handlers to the wire
            $(mOE.target).on(Events.dragStop, (e, ui) => {
               e.stopPropagation();
               $(dragHandle).trigger(Events.dragStop, ui);
            });
         }
      })

   }

   const createWireAtPoint = (vector: Vector) => {
      const wire = Component.WireLayout.makeInstance({}, {
         joints: [{ x: vector.x, y: vector.y }, { x: vector.x, y: vector.y }],
      });
      manifest.addComponent(manifest.layout, wire);
      return wire;
   }
}