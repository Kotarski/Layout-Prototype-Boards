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
               location: this.group.transforms
            }
         }


         insertInto(group: Svg.Elements.Group) {
            Svg.Utility.Insert.before(this.group.element, group.element, ".component");
         }


         draw() {
            this.group.addClasses(this.name);
            let text = this.voltage.toFixed(1);

            this.group.append([
               new Svg.Elements.Graphics.Simples.Rect(
                  { X: 0, Y: 5 }, { width: 180, height: 95 }, { X: 10, Y: 10 }, "body highlight"
               ),
               new Svg.Elements.Graphics.Simples.Rect(
                  { X: 0, Y: -5 }, { width: 160, height: 65 }, { X: 10, Y: 10 }, "screen"
               ),
               new Svg.Elements.Graphics.Simples.Text(
                  "8".repeat(text.length - 1), { X: 0, Y: 20 }, false, "screentext off"
               ),
               new Svg.Elements.Graphics.Simples.Text(
                  text, { X: 0, Y: 20 }, false, "screentext on"
               ),
               new Svg.Elements.Graphics.Simples.Circle(
                  { X: 0, Y: 40 }, 5, "hole"
               )
            ]);
         }

         /** Builds and draws the components connectors */
         makeConnectors() {
            this.connectorSets = [[
               Component.Generics.makeConnector(this, "", "hole", { X: 0, Y: 40 })
            ]]
         }

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

      export const makeInstance = Generics.getMaker(Instance, defaultProperties, defaultState,
         (component: Instance) => {
            component.group.addClasses(component.name);
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