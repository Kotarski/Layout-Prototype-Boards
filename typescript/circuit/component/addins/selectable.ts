import Component, { insert } from "../../+component";
import Events from "../../events";
import manifest from "../../manifest";
//import * as $ from 'jquery';
const Selectable = (() => {
   const init = (component: Component) => {
      setSelectTrigger(component);
      setDisplayHandlers(component);
   }



   const getSelectsCheck = (component: Component) =>
      (i: any, element: Node) => ($(element).data("selects") === component);

   const elementDirectlySelectsComponent = (element: Node, component: Component) => {
      const parents = $(element).parents(); //Ancestors

      const selectionElement = component.group.element;
      const elementCorrespondsToComponent = parents.is(selectionElement);

      const secondarySelectionCheck = getSelectsCheck(component);
      const elementIsComponentSelector = parents.is(secondarySelectionCheck);

      return (elementCorrespondsToComponent || elementIsComponentSelector);
   }

   const elementIndirectlySelectsComponent = (element: Node, component: Component) => {
      const selectionElements = manifest.findCorresponding(component).map(el => el.group.element);
      return $(element).parents().is(selectionElements);
   }

   const elementSelectsComponent = (element: Node, component: Component) => (
      elementDirectlySelectsComponent(element, component) ||
      elementIndirectlySelectsComponent(element, component)
   )

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
         // Checks if target is child of component, ignore if so
         if (elementDirectlySelectsComponent(e.target, component)) {
            setDeselectTrigger(component);
            return;
         }

         const otherComponents = manifest.findCorresponding(component);
         const selectComponents = otherComponents.concat(component);
         selectComponents.forEach(selectComponent => {
            // Only deselect if not selected by new selection
            if (!elementSelectsComponent(e.target, selectComponent)) {
               $(selectComponent.group.element).trigger(Events.deselect);
            }
         });
         setSelectTrigger(component);
      })
   }

   const setDisplayHandlers = (component: Component) => {
      $(component.group.element).on(Events.select, () => {
         $(component.group.element).addClass("selected");
         insert(component);
      });
      $(component.group.element).on(Events.deselect, () => {
         $(component.group.element).removeClass("selected");
      });
   }

   return { init }
})()
export default Selectable;