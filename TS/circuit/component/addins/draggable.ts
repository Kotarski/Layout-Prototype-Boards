namespace Circuit.Component.Addins.Draggable {
   type draggableComponent = Component.Instance & { joints: Vector[] };
   export const init = (component: draggableComponent) => {
      Svg.Addins.Draggable.init(component.group.element, {
         disableMovement: true,
         onStart: () => {
            component.insertInto(component.group.element);
         },
         onDrag: (drag: Vector) => {
            // TODO IMMUTABLE
            component.joints.forEach(joint => {
               joint.x += drag.x;
               joint.y += drag.y;
            })
            $(component.group.element).trigger(Events.draw);
         }
      });
   }
}