import Component from "../../+component";
import Events from "../../events";
import manifest from "../../manifest";
//import * as $ from 'jquery';
namespace Selectable {
   export const init = (component: Component) => {
      setSelectTrigger(component);
      setDisplayHandlers(component);
   }

   const findSelectionElements = (component: Component) => {
      return manifest.findCorresponding(component).concat(component).map(el => el.group.element);
   }

   const getSelectsCheck = (component: Component) =>
      (i: any, element: Node) => ($(element).data("selects") === component);


   const elementSelectsComponent = (element: Node, component: Component) => {
      const parents = $(element).parents(); //Ancestors

      const selectionElements = findSelectionElements(component);
      const elementCorrespondsToComponent = parents.is(selectionElements);

      const secondarySelectionCheck = getSelectsCheck(component);
      const elementIsComponentSelector = parents.is(secondarySelectionCheck);

      return (elementCorrespondsToComponent || elementIsComponentSelector);
   }

   const setSelectTrigger = (component: Component) => {
      // Selecting component triggers select
      $(component.group.element).one("mousedown", () => {
         /*LOGSTART*/console.groupCollapsed("Selected", component.group.element);/*LOGEND*/
         /*LOGSTART*/console.log("Primary: %o", component);/*LOGEND*/

         const otherComponents = manifest.findCorresponding(component);
         /*LOGSTART*/console.log("Secondaries: %o", otherComponents);/*LOGEND*/

         const selectComponents = otherComponents.concat(component);
         selectComponents.forEach(selectComponent => {
            $(selectComponent.group.element).trigger(Events.select);
         });
         setDeselectTrigger(component);

         /*LOGSTART*/console.groupEnd();/*LOGEND*/
      })


   }

   const setDeselectTrigger = (component: Component) => {
      // Selecting anywhere else triggers deselect
      $(document).one("mousedown", e => {
         // Checks target isn't child of component, ignore if so
         if (elementSelectsComponent(e.target, component)) {
            setDeselectTrigger(component);
         } else {

            const otherComponents = manifest.findCorresponding(component);

            const selectComponents = otherComponents.concat(component);
            selectComponents.forEach(selectComponent => {
               $(selectComponent.group.element).trigger(Events.deselect);
            });
            setSelectTrigger(component);
         }
      })
   }

   const setDisplayHandlers = (component: Component) => {
      $(component.group.element).on(Events.select, () => {
         $(component.group.element).addClass("selected");
         component.insertInto(component.group.element);
      });
      $(component.group.element).on(Events.deselect, () => {
         $(component.group.element).removeClass("selected");
      })
   }
}
export default Selectable;