namespace Circuit.Component {

   export namespace Types {
      export interface properties {
         name: string;
      };

      export interface state {
         location: Svg.Types.transformMatrix;
      }

      export interface insertionFunction {
         (group: Svg.Elements.Group, target: Svg.Elements.Group, ...any: any[]): void;
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
         point: SVGPoint;
         component: Instance;
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
      group: Svg.Elements.Group = new Svg.Elements.Group();
      connectorSets: Types.connector[][] = [];
      get location() {
         return this.group.transforms
      }
      set location(location: Svg.Types.transformMatrix) {
         this.group.transforms = location;
      }

      constructor(properties: Types.properties, state: Types.state) {
         this.location = state.location;
         this.name = properties.name;
      }

      abstract getProperties(): Types.properties;

      abstract getState(): Types.state;


      abstract draw(): void;

      /** Builds and draws the components connectors */
      abstract makeConnectors(): void;

      insertInto(group: Svg.Elements.Group) {
         Utility.Insert.last(this.group.element, group.element);
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
      transferFunction(from: Types.connector): Types.connector[] {
         return [];
      }

   }
}