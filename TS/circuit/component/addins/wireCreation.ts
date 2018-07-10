namespace Circuit.Component.Addins.WireCreation {
   type holeyComponent = Component.Instance & { connectorSets: Component.Types.hole[][] };


   export const init = (component: holeyComponent) => {
      // Hole elements will not exist at initialisation,
      // need to use component filtered by .hole selector
      $(component.group.element).on("mouseenter", ".hole", (mOE) => {
         // Set the hole as draggable if it isn't already
         if (!$(mOE.target).draggable('instance')) {
            component.group.setDraggable({
               eventTarget: mOE.target as SVGGraphicsElement,
               disableMovement: true,
               styleClass: ""
            });

            let dragHandle: SVGGraphicsElement;

            // Create the wire, select it, and grab a handle (any is fine)
            $(mOE.target).on(Events.dragStart, (e, ui, drag: Global.Types.vector) => {
               const position = Active.layout.group.convertVector({ X: e.clientX, Y: e.clientY }, "DomToSvg", "relToGroup");
               const gridPosition = Utility.snapVectorToGrid(position);
               const wire = createWireAtPoint(gridPosition);
               dragHandle = $(wire.group.element).find(".dragHandle")[0] as any;
               $(dragHandle).trigger("mousedown");
               $(dragHandle).trigger(Events.dragStart);
            })

            // Pass the handlers to the wire
            $(mOE.target).on(Events.drag, (e, ui, drag: Global.Types.vector) => {
               $(dragHandle).trigger(Events.drag, [ui, drag]);
            });

            // Pass the handlers to the wire
            $(mOE.target).on(Events.dragStop, (e, ui) => {
               $(dragHandle).trigger(Events.dragStop, ui);
            });
         }
      })

   }

   const createWireAtPoint = (vector: Global.Types.vector) => {
      const wire = Component.WireLayout.makeInstance({}, {
         joints: [{ X: vector.X, Y: vector.Y }, { X: vector.X, Y: vector.Y }]
      });
      manifest.addComponent(wire, manifest.layout);

      return wire;
   }
}