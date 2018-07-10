namespace Circuit.Component.Addins.Draggable {
   export const init = (component: Component.Instance) => {
      component.group.setDraggable({
         onStart: () => {
            component.insertInto(component.group);
         }
      })
   }
}