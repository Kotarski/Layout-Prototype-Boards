// import Component from "../../+component";
// import { Vector, Strict } from "../../../++types";
// import mappings from "../../mappings";
// import { make as makeGroup } from "../../../svg/element/+group";
// import { make as makeCircle} from "../../../svg/element/+circle";
// import Active from "../../../~active";
// import Events from "../../events";
// import vector from "../../../-vector";


// type ExtendableComponent = Component & { joints: Vector[]| Vector[][] }
// /* Note:
//    Joints is a two dimensional array to allow more complexity in component shapes,
//    while maintaining the consistent view of a body.
//    Example:
//       Before:
//          ResistorJoints = [
//             {x: -20, y: 0},   // End 0
//             {x: 0, y: 0},     // End 1
//          ]
//          The resistor body is always built between these two points, limiting the
//          resistors shape to a line (when sometimes in real circuits you may want a 'U' shape)
//       After:
//          ResistorJoints = [
//             [{x: -20, y: 0},  {...}, {...},  {x: -20, y: 20}],    ->Lead 0
//             [{x: 0, y: 0},    {...}, {...},  {x: 0, y: 20}],      ->Lead 1
//             Start                            End
//          ]
//          The resistors body is built between the start points of each lead,
//          but the path to the ends can be as complex as required (or a single joint can be both)
   
//    Thus the top array (e.g. joints[index]) determines the number of leads on a 
//    component (a resistor or wire will have two, and a bipolar 3).
//    While the inner arrays (e.g. joints[lead][index]) determine the path of the leads,
//    with the first vector in each determining how the body is draw, and the last
//    indicating where the component connects.

//    I'm going to try to refer to the outer array as leads, and the inner members as joints
// */


// const Extendable_ = (() => {
//    /*
//       reticulatable: Joints can be added and removed (I can't see a case where I would 
//          wish to allow one but not the other)
//       removable: The component can be completely removed by the continued removal of joints
//          this is only compatable with single lead components (can't see a case for removable leads)
//    */
//    type Options<T extends ExtendableComponent> = {
//       reticulatable?: boolean,   
//       removable?: boolean //T extends { joints: { length: 1 } } ? boolean : false
//    }
//    type ConfirmedOptions = Required<Options<ExtendableComponent>>
//    const init = <C extends ExtendableComponent, T extends Strict<Options<C>, T>>(component: C, options?: T) => {
//       const confirmedOptions:ConfirmedOptions = {
//          reticulatable: false,
//          removable: false,
//          ...(options ? options : {})
//       }

//       const element = component.group.element;

//       let extendableHelper: ReturnType<typeof makeExtendableHelper>;

//       $(element).on(Events.select, () => {
//          extendableHelper = makeExtendableHelper(component, confirmedOptions);
//       });

//       $(element).on(Events.drag, () => {
//          $(extendableHelper.element).remove();
//          extendableHelper = makeExtendableHelper(component, confirmedOptions);
//       });

//       $(element).on(Events.deselect, () => {
//          $(extendableHelper.element).remove();
//       });

//    /*
//       The idea is that when an extendable component is selected:
//          A handle is drawn at the position of every joint, which can be used to 
//          manipulate that joint.
//       Where appropriate, joints/handles can be added to a lead by:
//          Double clicking on that lead
//       Where appropriate, joints/handles can be removed by:
//          Double clicking on the handle
//          Dragging one handle over another handle on the same lead:
//             Possibly removing all interim joints.
//             I believe it shouldn't matter which joint/handle is removed, as long as one is and the drag continues

//       The handles should be drawn outside of the components group to ensure ordering is always consitent,
//       and to circumnavigate problems with drag events calling on the components body.

//       When another component is selected, the handles must be cleared. 
//       It's possible  (due to racing events) that the new handles are drawn before the 
//       previous handles are cleared. The handles must therefore not be removed blanketly
//       (e.g. by finding the elements by class). They must be kept track of from creation to
//       removal.

//       The handles should be created in a group e.g.
//       <g class="extendable-helper">
//          <g class="lead">handles for lead 0</g>
//          <g class="lead">handles for lead 1</g>
//       </g>
//    */
//    }

//    const makeExtendableHelper = (component:ExtendableComponent, options: ConfirmedOptions) => {
//       const diagramType = mappings.getComponentMapSafe(component).diagramType;
//       const container = Active[diagramType].group;
//       const helper = drawExtendableHelper(component, options);
//       container.append(helper);
//       return helper;
//    }

//    const drawExtendableHelper = (component:ExtendableComponent, options: ConfirmedOptions) => {
//       const container = makeGroup("extendable-helper draggable");
//       $(container.element).data("selects", component);

//       const joints: Vector[][] = vector.isVectorArray(component.joints)
//          ? [component.joints]
//          : component.joints;

//       joints.forEach(lead => {
//          const leadContainer = makeGroup("lead");
//          container.append(leadContainer);

//          leadContainer.append(lead.map(handleFactory(component,options)))
//       });
//       return container;
//    }


//    const handleFactory = (
//       component: ExtendableComponent,
//       options: ConfirmedOptions
//    ) => (joint: Vector) => {
//       const handle = makeCircle(joint, 5, "handle draggable"); 

//       $(handle.element).on(Events.dragStart, () => {
      

//       });

//       $(handle.element).on(Events.drag, (e, drag) => {
//          joint.x += drag.x;
//          joint.y += drag.y;
//          handle.element.setAttribute("cx", joint.x.toString());
//          handle.element.setAttribute("cy", joint.y.toString());
//          $(component.group.element).trigger(Events.draw);
//       });

//       $(handle.element).on(Events.dragStop, () => {
         
//       });

//       $(handle.element).on("dblclick", () => {
         
//       });

//       return handle;
//    }


//    return { init }
// })()

// export default Extendable_;