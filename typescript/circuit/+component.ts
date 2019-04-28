import { Vector } from "../-vector";
import getMaker from "./generics/-getMaker"
export namespace Types {
   export interface properties {
   };

   export interface state {};

   export interface insertionFunction {
      (group: SVGGElement, target: SVGGElement, ...any: any[]): void;
   }

   export interface loadFunction<R extends Component | Component[]= Component> {
      (raw: any): R;
   }

   export interface connectionFunction {
      (component: Component): connector[][];
   }

   export interface map {
      savename: string;
      diagramType: "layout" | "schematic";
      instance: { new(properties: any, states: any): Component };
      make: ReturnType<typeof getMaker>;
      load: Types.loadFunction<Component | Component[]>;
      correspondsTo?: map;
      isUnique?: boolean;
      isBoard?: boolean;
   }

   export type connectorTypes = "pin" | "hole" | "brokenhole" | "node";
   export interface connector<T extends connectorTypes = connectorTypes> {
      name: string;
      type: T;
      point: Vector;
      component: Component;
      symbol?: string;
   }

   export interface hole extends connector {
      type: "hole" | "brokenhole"
   };

   export interface node extends connector {
      type: "node"
   };

}

import { group } from "../svg/element/+group";
import Insert from "../utility/~insert";
import deepCopy from "../utility/-deepCopy";

export default interface Component<
   F extends "schematic" | "layout" = "schematic" | "layout",
   P extends Types.properties = Types.properties, 
   S extends Types.state = Types.state> {
   type: string;
   form: F
   group: group;
   properties: P;
   states: S;

   draw(): void;

   
   getConnectors(): Types.connector[][];

   transferFunction(from: Types.connector): Types.connector[];

   flags: {
      order: "back" | "mid" | "fore";
      disabled: boolean;
   }
}

type copyable<T extends {copy?: (()=>T)}> = T&{ copy?: (()=>T) }

export function insert(component: Component, target?: Element) {
   Insert.before(component.group.element, target, "marker-"+component.flags.order);
}


export function getProperties<C extends { properties: copyable<C["properties"]> }>(component: C): C["properties"] {
   if (component.properties.copy) return component.properties.copy()
   return deepCopy(component.properties)
}

export function getStates<C extends { states: copyable<C["states"]> }>(component: C): C["states"] {
   if (component.states.copy) return component.states.copy()
   return deepCopy(component.states)
}

export function getFlags<C extends { flags: copyable<C["flags"]> }>(component: C): C["flags"] {
   if (component.flags.copy) return component.flags.copy()
   return deepCopy(component.flags)
}