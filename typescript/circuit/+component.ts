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

import { make as makeGroup } from "../svg/element/+group";
export default abstract class Component implements Types.properties, Types.state {
   name: string;
   group = makeGroup();
   connectorSets: Types.connector[][] = [];
   disabled: boolean;

   constructor(values: Types.properties & Types.state) {
      this.name = values.name;
      this.disabled = values.disabled;
   }

   abstract getProperties(): Types.properties;

   abstract getState(): Types.state;


   abstract draw(): void;

   /** Builds and draws the components connectors */
   abstract makeConnectors(): void;

   abstract insertInto(element?: SVGGraphicsElement): void;

   /** Gets other components that this component is connected to, or that
    * the component specified in "from" is connected to via this component.
   */
   abstract getConnections(): Types.connector[][][];

   /** ...
   */
   abstract transferFunction(from: Types.connector): Types.connector[];
}



export abstract class Component__ implements Types.properties, Types.state {
   name: string;
   group = makeGroup();
   connectorSets: Types.connector[][] = [];
   disabled: boolean;

   constructor(values: Types.properties & Types.state) {
      this.name = values.name;
      this.disabled = values.disabled;
   }

   abstract getProperties(): Types.properties;

   abstract getState(): Types.state;


   abstract draw(): void;

   /** Builds and draws the components connectors */
   abstract makeConnectors(): void;

   abstract insertInto(element?: SVGGraphicsElement): void;

   /** Gets other components that this component is connected to, or that
    * the component specified in "from" is connected to via this component.
   */
   abstract getConnections(): Types.connector[][][];

   /** ...
   */
   abstract transferFunction(from: Types.connector): Types.connector[];
}
