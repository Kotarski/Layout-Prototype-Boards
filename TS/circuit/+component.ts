namespace Circuit.Component {

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

      constructor(properties: Types.properties, state: Types.state) {
         this.name = properties.name;
         this.disabled = state.disabled;
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
         instanceClass: { new(p: P, s: S): C },
         defaultProperties: P,
         defaultState: S,
         initialiser: (component: C) => void) {
      return (
         partialProperties: Global.Types.DeepPartial<P>,
         partialState: Global.Types.DeepPartial<S>,
         printFallbacks: boolean = false
      ): C => {
         const defaultPropertyCopy = JSON.parse(JSON.stringify(defaultProperties));
         const defaultStateCopy = JSON.parse(JSON.stringify(defaultState));
         const properties = loadObjectWithDefaults(defaultPropertyCopy, partialProperties, [defaultProperties.name, "properties"], printFallbacks);
         const state = loadObjectWithDefaults(defaultStateCopy, partialState, [defaultProperties.name, "state"], printFallbacks);
         const component = new instanceClass(properties, state) as C;
         if (initialiser) initialiser(component);
         component.draw();
         component.makeConnectors();
         return component;
      }
   }

   function loadObjectWithDefaults(fallback: any, given: any, runningLocation: string[] = [], printFallbacks: boolean = false) {
      // Check types match
      if (typeof fallback !== typeof given || given === undefined) {
         if (printFallbacks) {
            console.log("Given type for \"%s\" does not match fallback, fallback value %o used.", runningLocation.join("."), fallback);
         }
         // if types are object, check object properties match
      } else if (typeof fallback === "object" && !Array.isArray(fallback) && fallback !== null) {
         Object.keys(fallback).forEach(key => {
            let newRunningLocation = runningLocation.concat(key);
            if (!given.hasOwnProperty(key)) {
               if (printFallbacks) {
                  console.log("Given does not contain key \"%s\", fallback value %o used.", newRunningLocation.join("."), fallback[key]);
               }
            } else {
               fallback[key] = loadObjectWithDefaults(fallback[key], given[key], newRunningLocation, printFallbacks)
            }
         });
      } else {
         fallback = given;
      }
      return fallback;
   }
}

