import { Vector } from "../../../++types";

/* The types required by the addin ********************************************/
type PreDraggableComponent = {
   states: {
      joints: {
         [key: string]: Vector | [Vector, ...Vector[]]
         // Record<string, Vector | [Vector, ...Vector[]]>
      }
   },
   flags: {}
}

/* The types added by the addin ***********************************************/
export type DraggableComponent<T extends PreDraggableComponent> = T & {
   flags: {
      draggable: boolean,
      dragging: boolean
   }
} 

// // declare function draggable<T extends PreDraggableComponent>(component: T): DraggableComponent<T>

// function draggable<T extends PreDraggableComponent>(component: T): DraggableComponent<T> {

//    const flags = {
//       ...component.flags, ...{
//          draggable: false,
//          dragging: false
//       }
//    }
   
//    const newC = {...component,...{ flags }}

//    return newC
// }
