namespace Circuit.Component.Addins.Graphical {
   export const init = (component: Component.Instance) => {
      let element = component.group.element;
      $(element).on(Events.draw, () => {
         if (component.disabled === false) {
            $(component.group.element).show();
            component.group.clearChildren(":not(.handle,.connectivityhighlight)");
            component.draw();
            component.makeConnectors();
         } else {
            $(component.group.element).hide();
         }
      });
   }
}