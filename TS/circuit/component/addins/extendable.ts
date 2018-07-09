namespace Circuit.Component.Addins.Extendable {
   type extendableComponent = Component.Instance & { joints: Global.Types.vector[] };
   export const init = (
      component: extendableComponent,
      canAddJoints: boolean = false,
      canRemoveJoints: boolean = false,
      canRemoveComponent: boolean = false) => {
      if (canAddJoints) initHandleInsertion(component);
      if (canRemoveJoints) initJointRemoval(component);
      if (canRemoveComponent) initComponentRemoval(component);
      initHandles(component);
   }

   const refreshComponent = (component: extendableComponent) => {
      component.group.clear(":not(.handle)");
      component.makeConnectors();
      component.draw();
      // $(component.group.element).trigger("deselect");
      $(component.group.element).trigger("select");
   };

   const initHandles = (component: extendableComponent) => {
      component.joints.forEach(joint => {
         addHandle(component, joint)
      })
   };

   const initHandleInsertion = (component: extendableComponent) => {
      $(component.group.element).dblclick(e => {
         if ($(e.target).closest(".handle").length < 1) {
            // Get position in svg coordinates, rounded to grid
            let position = component.group.convertVector({ X: e.clientX, Y: e.clientY }, "DomToSvg", "relToGroup");
            position = Utility.snapVectorToGrid(position);

            //insert joint at position
            component.joints.splice(getJointInsertionIdx(component, position), 0, position);
            addHandle(component, position);
            refreshComponent(component);
         }
      });
   };

   const initJointRemoval = (component: extendableComponent) => {
      $(component.group.element).on("dragSVG", ".dragHandle", (e) => {
         removeExcessJoints(component, $(e.target).data("point"));
         refreshComponent(component);
      });

      $(component.group.element).on("dblclick", ".dragHandle", (e) => {
         if (component.joints.length > 2) {
            component.joints = component.joints.filter((joint, idx) => {
               return joint !== $(e.target).data("point")
            });
            e.target.remove();
            refreshComponent(component);
         }
      });
   }

   const initComponentRemoval = (component: extendableComponent) => {
      $(component.group.element).on("dragstop", ".dragHandle", (e) => {
         if (component.joints.length === 2 && Utility.vectorsAreClose(component.joints[0], component.joints[1])) {
            manifest.removeComponent(component);
         }
      });
   };

   const addHandle = (component: extendableComponent, point: Global.Types.vector) => {
      let dragHandle = new Svg.Elements.Graphics.Simples.Circle(point, 5, "handle dragHandle highlight highlightwithfill");
      $(dragHandle.element).data('point', point);
      component.group.append(dragHandle);
      dragHandle.setDraggable();

      $(dragHandle.element).on("dragSVG", (e, ui, drag: Global.Types.vector) => {
         point.X += drag.X;
         point.Y += drag.Y;
         refreshComponent(component);
      });


      return dragHandle;
   };

   const removeExcessJoints = (component: extendableComponent, point: Global.Types.vector) => {
      if (component.joints.length > 2) {
         component.joints = component.joints.filter((joint, idx) => {
            if ((joint !== point) && Utility.vectorsAreClose(point, joint)) {
               $(component.group.element).children(".dragHandle").filter((i, el) => $(el).data('point') === joint).remove();
               return false;
            }
            return true;
         });
      };
   }

   const getJointInsertionIdx = (component: extendableComponent, point: Global.Types.vector) => {
      //handles: (Parts.Pins.MovePin)[],
      let jointAngles = component.joints.map((j) =>
         Math.atan2(point.Y - j.Y, point.X - j.X) * 180 / Math.PI
      );

      let bestAnglePair = 180;
      let bestJointIdx = 0;

      for (let i = 1; i < jointAngles.length; i++) {
         let anglePair = Math.abs(Math.abs((jointAngles[i - 1] - jointAngles[i])) - 180)
         if (anglePair < bestAnglePair) {
            bestAnglePair = anglePair;
            bestJointIdx = i;
         }
      }

      return bestJointIdx;
   }
}