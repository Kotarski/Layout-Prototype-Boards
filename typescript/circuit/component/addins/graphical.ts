import Component from "../../+component";;
import Events from "../../events";
//import * as $ from 'jquery';
namespace Graphical {
   export const init = (component: Component) => {
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
export default Graphical;