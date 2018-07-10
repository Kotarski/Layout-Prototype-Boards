namespace Circuit.Component.Addins.Rotatable {
   export const init = (component: Component.Instance, rotationCentre: Global.Types.vector = { X: 0, Y: 0 }) => {
      component.group.setDoubleClickable({
         response: () => {
            component.group.rotate(90, rotationCentre);
            $(component.group.element).trigger(Events.rotate);
         }
      })
   }
}