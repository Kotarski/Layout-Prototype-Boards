namespace Circuit.Component.Addins.Draggable {
   type draggableComponent = Component.Instance & { joints: Vector[] };
   export const init = (component: draggableComponent) => {
      Svg.Addins.Draggable.init(component.group.element, {
         disableMovement: true,
         onStart: () => {
            history.addEvent(component);
            component.insertInto(component.group.element);
         },
         onDrag: (drag: Vector) => {
            // TODO IMMUTABLE
            component.joints.forEach(joint => {
               joint.x += drag.x;
               joint.y += drag.y;
            })
            $(component.group.element).trigger(Events.draw);
         },
         onStop: () => {
            component.joints.forEach(joint => {
               joint.x = Math.round(joint.x);
               joint.y = Math.round(joint.y);
            });
         }
      });

      // TODO, I don't quite like how this is coupled together
      if (mappings.getComponentMapSafe(component).isBoard &&
         NodeElements.boardDraggingDisabled.checked
      ) {
         disable(component);
      }
   }

   export const disable = (component: Component.Instance) => {
      if ($(component.group.element).draggable("instance") !== undefined) {
         $(component.group.element).draggable("disable");
      }
   }

   export const enable = (component: Component.Instance) => {
      if ($(component.group.element).draggable("instance") !== undefined) {
         $(component.group.element).draggable("enable");
      }
   }
}