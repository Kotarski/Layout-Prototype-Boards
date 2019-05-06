import Component from "../+component";
import ValueCheck from "../component/~valueCheck";
import loadObjectWithDefaults from "./-loadObjectWithDefaults";
import { DeepPartial } from "../../++types";
import { isArray } from "util";
import { Addin } from "../component/addins/++types";
import pipe from "../../utility/-pipe";
//import * as $ from 'jquery';

type Initialiser<C extends Component, T extends {}> = [Addin<C, T>, T] | Addin<C>

type Initialisers<C extends Component, T extends {}[]> = {
   [P in keyof T]: T[P] extends T[number] ? Initialiser<C, T[P]> : never;
}



const getDefaulter = <C extends { properties: C["properties"], states: C["states"] } & Component>(
   defaulter: {
      properties: ValueCheck.Defaulter<C["properties"]>,
      states: ValueCheck.Defaulter<C["states"]>
   }
) => (partialValues: DeepPartial<C["properties"] & C["states"]>) => {
   const properties = loadObjectWithDefaults<C["properties"]>(defaulter.properties, partialValues);
   const states = loadObjectWithDefaults<C["states"]>(defaulter.states, partialValues);
   return { properties, states}
}

const getNewComponentMaker = <C extends { properties: C["properties"], states: C["states"] } & Component>(
   instanceClass: { new(properties: C["properties"], states: C["states"]): C },
) => ({ properties, states, }: { properties: C["properties"], states: C["states"] }) => {
   
   return new instanceClass(properties, states)
}

const getAddinApplicator = <C extends Component, OS extends {}[] = {}[]>(
   ...addins: Initialisers<C, OS>
) => (component: C
):C => {
   addins.forEach(addin => {
      if (isArray(addin)) {
         addin[0].init(component, addin[1])
      } else {
         addin.init(component)
      }
   })
   return component;
} 


export default function getMaker<
   C extends {properties: C["properties"], states: C["states"]} & Component,
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
      

      const componentMaker = pipe(
         getDefaulter(defaulter),
         getNewComponentMaker(instanceClass),
         getAddinApplicator<C>(...addins),
      )
         
      const component = componentMaker(partialValues)

      /*LOGSTART*/
      if (log) {
         console.groupEnd();
      }
 
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
