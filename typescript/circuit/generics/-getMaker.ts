import Component from "../+component";
import ValueCheck from "../component/~valueCheck";
import loadObjectWithDefaults from "./-loadObjectWithDefaults";
import { DeepPartial } from "../../++types";
import { isArray } from "util";
import { Addin } from "../component/addins/++types";
//import * as $ from 'jquery';

type Initialiser<C extends Component, T extends {}> = [Addin<C, T>, T] | Addin<C>

type Initialisers<C extends Component, T extends {}[]> = {
   [P in keyof T]: T[P] extends T[number] ? Initialiser<C, T[P]> : never;
}

export default interface getMaker<
   C extends Component,
   V extends ReturnType<C["getProperties"]> & ReturnType<C["getState"]>
   > {
   (
      instanceClass: { new(values: V): C },
      defaulter: ValueCheck.Defaulter<V>,
      initialiser: (component: C) => void
   ): (
         partialValues: DeepPartial<V>,
         log: boolean
      ) => C
}
export default function getMaker<
   C extends Component,
   V extends ReturnType<C["getProperties"]> & ReturnType<C["getState"]>,
   // A extends Addin<C, O>,
   OS extends {}[]
>(
   instanceClass: { new(values: V): C },
   defaulter: ValueCheck.Defaulter<V>,
   ...addins: Initialisers<C, OS>
) {
   return (
      partialValues: DeepPartial<V>,
      log = true
   ): C => {
      /*LOGSTART*/
      if (log) {
         console.groupCollapsed("Loading...");
      }
      /*LOGEND*/
      const values = loadObjectWithDefaults(defaulter, partialValues, log);
      /*LOGSTART*/
      if (log) {
         console.groupEnd();
      }
      /*LOGEND*/

      const component = new instanceClass(values) as C;

      addins.forEach(addin => {
         if (isArray(addin)) {
            addin[0].init(component, addin[1])
         } else {
            addin.init(component)
         }
      })

      component.draw();

      /*LOGSTART*/
      if (log) {
         console.groupCollapsed("%s: %o", component.name, component.group.element);
         console.log(component);
         console.groupEnd();
      }
      /*LOGEND*/

      $(component.group.element).addClass(component.name)

      return component;
   }
}
