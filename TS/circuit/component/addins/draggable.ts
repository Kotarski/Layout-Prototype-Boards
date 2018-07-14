namespace Circuit.Component.Addins.Draggable {
   export const init = (component: Component.Instance) => {
      Svg.Addins.Draggable.init(component.group, {
         onStart: () => {
            component.insertInto(component.group);
         }
      });
   }
}