import { Vector } from "../-vector";
import getMaker from "./generics/-getMaker"
export namespace Types {
   export interface properties {
      name: string;
   };

   export interface state {
      disabled: boolean;
   };

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
      instance: { new(values: any): Component };
      make: ReturnType<typeof getMaker>;
      load: Types.loadFunction<Component | Component[]>;
      correspondsTo?: map;
      isUnique?: boolean;
      isBoard?: boolean;
   }

   export type connectorTypes = "pin" | "hole" | "brokenhole" | "node";
   export interface connector {
      name: string;
      type: connectorTypes;
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

export default interface Component extends Types.properties, Types.state {
   name: string;
   form: "schematic"|"layout"
   disabled: boolean;
   group: group;

   getProperties(): Types.properties;

   getState(): Types.state;


   draw(): void;

   
   getConnectors(): Types.connector[][];

   insertInto(element?: SVGGraphicsElement): void;

   /** ...
   */
   transferFunction(from: Types.connector): Types.connector[];
}

