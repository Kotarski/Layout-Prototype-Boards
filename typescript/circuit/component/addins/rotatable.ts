import Component from "../../+component";;
import Events from "../../events";
import vector, { Vector } from "../../../-vector";
import history from "../../history";
//import * as $ from 'jquery';

type rotatableComponent = Component & {
   states: { joints: [Vector, Vector, ...Vector[]] }
};

const Rotatable = (() => {
   /** Initialise rotation using joint[0] as the rotation points
    *  Rotation triggered by double click in 90deg incriments
    */
   const init = (component: rotatableComponent) => {
      $(component.group.element).dblclick(() => {
         history.add(component);
         let centre = component.states.joints[0];

         component.states.joints = vector(component.states.joints)
            .sumWith(vector(centre).scaleWith(-1))
            .rotate(90)
            .sumWith(centre)
            .vectors as [Vector, Vector, ...Vector[]]

         $(component.group.element).trigger(Events.draw);
         $(component.group.element).trigger(Events.rotate);
      })
   }

   return { init }
})()
export default Rotatable;