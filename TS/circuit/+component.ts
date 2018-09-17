/// <reference path="component/~valueCheck.ts" />
namespace Circuit.Component {

   export namespace Types {
      export interface properties {
         name: string;
      };

      export interface state {
         disabled?: boolean;
      };

      export interface insertionFunction {
         (group: SVGGElement, target: SVGGElement, ...any: any[]): void;
      }

      export interface loadFunction {
         (raw: any): (Component.Instance | Component.Instance[]);
      }

      export interface connectionFunction {
         (component: Instance): connector[][];
      }

      export type connectorTypes = "pin" | "hole" | "brokenhole" | "node";
      export interface connector {
         name: string;
         type: connectorTypes;
         point: Vector;
         component: Instance;
         symbol?: string;
      }

      export interface hole extends connector {
         type: "hole" | "brokenhole"
      };

      export interface node extends connector {
         type: "node"
      };

   }

   export abstract class Instance implements Types.properties, Types.state {
      name: string;
      group = Svg.Element.Group.make();
      connectorSets: Types.connector[][] = [];
      disabled: boolean;

      constructor(values: Types.properties & Types.state) {
         this.name = values.name;
         this.disabled = values.disabled || false;
      }

      abstract getProperties(): Types.properties;

      abstract getState(): Types.state;


      abstract draw(): void;

      /** Builds and draws the components connectors */
      abstract makeConnectors(): void;

      insertInto(element: SVGGraphicsElement) {
         Utility.Insert.last(this.group.element, element);
      }

      /** Gets other components that this component is connected to, or that
       * the component specified in "from" is connected to via this component.
      */
      getConnections(): Types.connector[][][] {
         if (manifest.layout.includes(this)) {
            return Generics.getComponentConnections(this, manifest.layout);
         } else {
            return Generics.getComponentConnections(this, manifest.schematic);
         }
      }

      /** ...
      */
      abstract transferFunction(from: Types.connector): Types.connector[];

   }

   export function getMaker<
      C extends Instance,
      P extends ReturnType<C["getProperties"]>,
      S extends ReturnType<C["getState"]>
      >(
         instanceClass: { new(v: P & S): C },
         defaulter: ValueCheck.Defaulter<P & S>,
         initialiser: (component: C) => void) {
      return (
         partialValues: Global.Types.DeepPartial<P & S>,
         log = false
      ): C => {
         if (log) console.groupCollapsed("Loading...");
         const values = loadObjectWithDefaults(defaulter, partialValues, log);
         if (log) console.groupEnd();

         const component = new instanceClass(values) as C;
         if (initialiser) initialiser(component);
         component.draw();
         component.makeConnectors();

         if (log) {
            console.groupCollapsed("%s: %o", component.name, component.group.element);
            console.log(component);
            console.groupEnd();
         }

         return component;
      }
   }

   function loadObjectWithDefaults<T>(defaulter: ValueCheck.Defaulter<T>, partial: any, log = true): T {
      //TS just needs to trust me here...
      const result: T = Object.keys(defaulter).reduce((acc, key) => {
         if (log) console.group(key);
         const defaultFn: ValueCheck.validater<any> = (defaulter as any)[key];
         const partialValue = (partial)[key];
         (acc as any)[key] = defaultFn(partialValue, log)
         if (log) console.groupEnd();
         return acc;
      }, {}) as T;

      return result;
   }
}

