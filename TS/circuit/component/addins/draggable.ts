namespace Circuit.Component.Addins.Draggable {
   export const init = (component: Component.Instance) => {
      Svg.Addins.Draggable.init(component.group.element, {
         onStart: () => {
            component.insertInto(component.group.element);
         }
      });
   }
}