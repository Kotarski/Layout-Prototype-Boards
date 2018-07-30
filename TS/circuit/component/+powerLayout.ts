namespace Circuit.Component {

   export namespace PowerLayout {
      export type Instance = Local.Instance;
      export namespace Types {
         export type properties = PowerSchematic.Types.properties;

         export interface state extends Component.Types.state { }

         export interface loadFunction extends Component.Types.loadFunction {
            (raw: any): Instance;
         }

         export type Instance = Local.Instance;
      }
   }

   namespace Local {
      import Types = PowerLayout.Types;

      export const defaultState: Types.state = {
         location: { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 },
      }
      export const defaultProperties: Types.properties = {
         name: "power",
         voltage: 0
      }

      export class Instance extends Component.Instance implements Types.properties, Types.state {
         voltage: number;
         connectorSets: Component.Types.hole[][] = [];

         constructor(properties: Types.properties, state: Types.state) {
            super(properties, state);
            this.voltage = properties.voltage;
         }

         getProperties(): Types.properties {
            return {
               name: this.name,
               voltage: this.voltage
            }
         }

         getState(): Types.state {
            return {
               location: this.location
            }
         }


         insertInto(element: SVGGraphicsElement) {
            Utility.Insert.before(this.group.element, element, ".component");
         }


         draw() {
            $(this.group.element).addClass(this.name);
            let text = this.voltage.toFixed(1);

            this.group.append(
               Svg.Element.Rect.make({ x: 0, y: 5 }, { width: 180, height: 95 }, { x: 10, y: 10 }, "body highlight"),
               Svg.Element.Rect.make({ x: 0, y: -5 }, { width: 160, height: 65 }, { x: 10, y: 10 }, "screen"),
               Svg.Element.Text.make("8".repeat(text.length - 1), { x: 0, y: 20 }, "screentext off"),
               Svg.Element.Text.make(text, { x: 0, y: 20 }, "screentext on"),
               Svg.Element.Circle.make({ x: 0, y: 40 }, 5, "hole")
            );
         }

         /** Builds and draws the components connectors */
         makeConnectors() {
            this.connectorSets = [[
               Component.Generics.makeConnector(this, "", "hole", { x: 0, y: 40 })
            ]]
         }

         transferFunction() { return [] };

      }

      export const loadInstance: Component.Types.loadFunction = (raw: any): Instance => {
         // Set default state
         let state = Object.assign({}, defaultState);
         // Set default properties
         let properties = Object.assign({}, defaultProperties);
         // If from a layout
         if (raw.state) {
            if (raw.state.location) {
               state.location = raw.state.location;
            }
         }
         if (raw.properties) {
            if (raw.properties.voltage) {
               properties.voltage = Number(raw.properties.voltage) || 0;
            }
         }

         return makeInstance(properties, state, true);
      }

      export const makeInstance = getMaker(Instance, defaultProperties, defaultState,
         (component: Instance) => {
            $(component.group.element).addClass(component.name);
            Addins.Draggable.init(component);
            Addins.Selectable.init(component);
            Addins.ConnectionHighlights.init(component, true, getHighlightColor(component));
            Addins.WireCreation.init(component);
         }
      );

      function getHighlightColor(component: Instance): string[] {
         return [(component.voltage < 0)
            ? "blue" // negative
            : (component.voltage > 0)
               ? "red" // positive
               : "black" // zero (ground);
         ]
      }

   }

   export const PowerLayout = {
      defaultState: Local.defaultState,
      defaultProperties: Local.defaultProperties,
      Instance: Local.Instance,
      makeInstance: Local.makeInstance,
      loadInstance: Local.loadInstance
   }
}