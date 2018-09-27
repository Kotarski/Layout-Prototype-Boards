namespace Circuit.Component.Addins.Selectable {
   export const init = (component: Component.Instance) => {
      setSelectTrigger(component);
      setDisplayHandlers(component);
   }

   const findSelectionElements = (component: Component.Instance) => {
      return manifest.findCorresponding(component).concat(component).map(el => el.group.element);
   }

   const elementSelectsComponent = (element: Element, component: Component.Instance) => {
      const selectionElements = findSelectionElements(component);
      const selectionElementIsSelected = $(element).closest(selectionElements).length > 0;
      const elementSelectsComponent = $(element).parents().is((i, el) =>
         ($(el).data("selects") === component)
      );
      return (selectionElementIsSelected || elementSelectsComponent);
   }

   const setSelectTrigger = (component: Component.Instance) => {
      // Selecting component triggers select
      $(component.group.element).one("mousedown", () => {
         console.groupCollapsed("Selected", component.group.element);
         console.log("Primary: %o", component);

         const otherComponents = manifest.findCorresponding(component);
         console.log("Secondaries: %o", otherComponents);

         const selectComponents = otherComponents.concat(component);
         selectComponents.forEach(selectComponent => {
            $(selectComponent.group.element).trigger(Events.select);
            setDeselectTrigger(selectComponent);
         });

         console.groupEnd();
      })


   }

   const setDeselectTrigger = (component: Component.Instance) => {
      // Selecting anywhere else triggers deselect
      $(document).one("mousedown", e => {
         // Checks target isn't child of component, ignore if so
         if (elementSelectsComponent(e.target, component)) {
            setDeselectTrigger(component);
         } else {
            $(component.group.element).trigger(Events.deselect);
            setSelectTrigger(component);
         }
      })
   }

   const setDisplayHandlers = (component: Component.Instance) => {
      $(component.group.element).on(Events.select, () => {
         $(component.group.element).addClass("selected");
         component.insertInto(component.group.element);
      });
      $(component.group.element).on(Events.deselect, () => {
         $(component.group.element).removeClass("selected");
      })
   }
}