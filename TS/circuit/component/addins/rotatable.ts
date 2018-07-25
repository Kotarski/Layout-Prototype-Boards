namespace Circuit.Component.Addins.Rotatable {
   export const init = (component: Component.Instance, rotationCentre: Global.Types.vector = { x: 0, y: 0 }) => {
      $(component.group.element).dblclick(() => {
         component.group.rotate(90, rotationCentre);
         $(component.group.element).trigger(Events.rotate);
      })
   }
}