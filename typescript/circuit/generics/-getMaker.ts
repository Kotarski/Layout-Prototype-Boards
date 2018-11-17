import Component from "../+component";
import ValueCheck from "../component/~valueCheck";
import loadObjectWithDefaults from "./-loadObjectWithDefaults";
import * as GlobalTypes from "../../++types";
//import * as $ from 'jquery';

export default interface getMaker<
   C extends Component,
   V extends ReturnType<C["getProperties"]> & ReturnType<C["getState"]>
   > {
   (
      instanceClass: { new(values: V): C },
      defaulter: ValueCheck.Defaulter<V>,
      initialiser: (component: C) => void
   ): (
         partialValues: GlobalTypes.DeepPartial<V>,
         log: boolean
      ) => C
}
export default function getMaker<
   C extends Component,
   V extends ReturnType<C["getProperties"]> & ReturnType<C["getState"]>,
   >(
      instanceClass: { new(values: V): C },
      defaulter: ValueCheck.Defaulter<V>,
      initialiser: (component: C) => void) {
   return (
      partialValues: GlobalTypes.DeepPartial<V>,
      log = true
   ): C => {
   /*LOGSTART*/if (log) {
         console.groupCollapsed("Loading...");
      }/*LOGEND*/
      const values = loadObjectWithDefaults(defaulter, partialValues, log);
   /*LOGSTART*/if (log) {
         console.groupEnd();
      }/*LOGEND*/

      const component = new instanceClass(values) as C;
      if (initialiser) initialiser(component);
      component.draw();
      component.makeConnectors();

   /*LOGSTART*/ if (log) {
         console.groupCollapsed("%s: %o", component.name, component.group.element);
         console.log(component);
         console.groupEnd();
      } /*LOGEND*/

      $(component.group.element).addClass(component.name)

      return component;
   }
}