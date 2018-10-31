namespace Circuit.Component.Addins.Extendable {
   type extendableComponent = Component.Instance & { joints: Vector[] };
   export const init = (
      component: extendableComponent,
      canAddJoints: boolean = false,
      canRemoveJoints: boolean = false,
      canRemoveComponent: boolean = false) => {


      let element = component.group.element;

      $(element).on(Events.select, () => {
         createHandles(component);
      });
      $(element).on(Events.draw, (e, eOrigin) => {
         if (!(eOrigin !== undefined && $(eOrigin.target).hasClass("dragHandle"))) {
            clearHandles(component);
            createHandles(component);
         }
      });
      $(element).on(Events.dragStop, () => {
         clearHandles(component);
         createHandles(component);
      });
      $(element).on(Events.deselect, () => {
         clearHandles(component);
      });

      if (canAddJoints) initHandleInsertion(component);
      if (canRemoveJoints) initJointRemoval(component);
      if (canRemoveComponent) initComponentRemoval(component);
   }


   const createHandles = (component: extendableComponent) => {
      initHandles(component);
   }


   const clearHandles = (component: extendableComponent) => {
      $(component.group.element).children(".dragHandle").remove();
   }

   const initHandles = (component: extendableComponent) => {
      component.joints.forEach(joint => {
         addHandle(component, joint)
      })
   };

   const initHandleInsertion = (component: extendableComponent) => {
      $(component.group.element).dblclick(e => {
         if ($(e.target).closest(".handle").length < 1) {
            // Get position in svg coordinates, rounded to grid
            const position = vector(
               component.group.convertVector({ x: e.clientX, y: e.clientY }, "DomToSvg", "relToGroup")
            ).snapToGrid().vector;

            // Get index for insertion into joint array
            const jointIdx = getJointInsertionIdx(component, position);

            //insert joint at position
            component.joints.splice(jointIdx, 0, position);
            addHandle(component, position);
            $(component.group.element).trigger(Events.draw, [e]);
         }
      });
   };

   const initJointRemoval = (component: extendableComponent) => {
      $(component.group.element).on(Events.drag, ".dragHandle", (e) => {
         removeExcessJoints(component, $(e.target).data("point"));
         $(component.group.element).trigger(Events.draw, [e]);
      });

      $(component.group.element).on("dblclick", ".dragHandle", (e) => {
         if (component.joints.length > 2) {
            const point = $(e.target).data("point");
            component.joints = component.joints.filter(Utility.isNot(point));
            e.target.remove();
            $(component.group.element).trigger(Events.draw, [e]);
         }
      });
   }

   const initComponentRemoval = (component: extendableComponent) => {
      $(component.group.element).on(Events.dragStop, ".dragHandle", (e) => {
         if (component.joints.length === 2 && vector(component.joints[0]).isCloseTo(component.joints[1])) {
            manifest.removeComponent(component);
            history.mergeLast();
         }
      });
   };

   const addHandle = (component: extendableComponent, point: Vector) => {
      let dragHandle = Svg.Element.Circle.make(point, 5, "handle dragHandle highlight");
      $(dragHandle.element).data('point', point);
      component.group.append(dragHandle);
      Svg.Addins.Draggable.init(dragHandle.element);

      $(dragHandle.element).on(Events.drag, (e, ui, drag: Vector) => {
         point.x += drag.x;
         point.y += drag.y;
         $(component.group.element).trigger(Events.draw, [e]);
      });

      $(dragHandle.element).on(Events.dragStop, (e, ui, drag: Vector) => {
         point.x = Math.round(point.x);
         point.y = Math.round(point.y);
      });

      return dragHandle;
   };

   const removeExcessJoints = (component: extendableComponent, point: Vector) => {
      if (component.joints.length > 2) {
         component.joints = component.joints.filter((joint) => {
            return (joint === point) || !vector(point).isCloseTo(joint)
         });
         $(component.group.element).children(".dragHandle").not(".dragging").filter((i, el) => {
            return vector(point).isCloseTo($(el).data('point'))
         }).remove();
      };
   }

   const getJointInsertionIdx = (component: extendableComponent, point: Vector) => {
      //handles: (Parts.Pins.MovePin)[],
      let jointAngles = component.joints.map((j) =>
         Math.atan2(point.y - j.y, point.x - j.x) * 180 / Math.PI
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