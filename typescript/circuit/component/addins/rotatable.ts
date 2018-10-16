import Component from "../../+component";;
import Events from "../../events";
import vector, { Vector } from "../../../-vector";
import history from "../../history";
//import * as $ from 'jquery';

namespace Rotatable {
   type rotatableComponent = Component & {
      joints: [Vector, Vector, ...Vector[]]
   };

   /** Initialise rotation using joint[0] as the rotation points
    *  Rotation triggered by double click in 90deg incriments
    */
   export const init = (component: rotatableComponent) => {
      $(component.group.element).dblclick(() => {
         history.addEvent(component);
         let centre = component.joints[0];

         component.joints = vector(component.joints)
            .sumWith(vector(centre).scaleWith(-1))
            .rotate(90)
            .sumWith(centre)
            .vectors as [Vector, Vector, ...Vector[]]

         $(component.group.element).trigger(Events.draw);
         $(component.group.element).trigger(Events.rotate);
      })
   }
}
export default Rotatable;