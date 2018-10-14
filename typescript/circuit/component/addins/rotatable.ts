namespace Circuit.Component.Addins.Rotatable {
   type rotatableComponent = Component.Instance & {
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