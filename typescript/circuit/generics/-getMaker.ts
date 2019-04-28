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

// export default interface getMaker<
//    C extends Component> {
//    (
//       instanceClass: { new(properties: C["properties"], states: C["states"]): C },
//       defaulter: ValueCheck.Defaulter<C>,
//       initialiser: (component: C) => void
//    ): (
//          partialValues: DeepPartial<C["properties"] & C["states"]>,
//          log: boolean
//       ) => C
// }
export default function getMaker<
   C extends {properties: C["properties"], states: C["states"]} & Component,
   // A extends Addin<C, O>,
   OS extends {}[] = {}[]
>(
   instanceClass: { new(properties: C["properties"], states: C["states"]): C },
   defaulter: {
      properties: ValueCheck.Defaulter<C["properties"]>,
      states: ValueCheck.Defaulter<C["states"]>
   },
   ...addins: Initialisers<C, OS>
) {
   return (
      partialValues: DeepPartial<C["properties"] & C["states"]>,
      log = true
   ): C => {
      /*LOGSTART*/
      if (log) {
         console.groupCollapsed("Loading...");
      }
      /*LOGEND*/
      const properties = loadObjectWithDefaults<C["properties"]>(defaulter.properties, partialValues, log);
      const states = loadObjectWithDefaults<C["states"]>(defaulter.states, partialValues, log);
      /*LOGSTART*/
      if (log) {
         console.groupEnd();
      }
      /*LOGEND*/

      const component = new instanceClass(properties, states) as C;

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
         console.groupCollapsed("%s: %o", component.type, component.group.element);
         console.log(component);
         console.groupEnd();
      }
      /*LOGEND*/

      $(component.group.element).addClass(component.type)

      return component;
   }
}
