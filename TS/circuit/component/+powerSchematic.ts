namespace Circuit.Component {
   export namespace PowerSchematic {
      export type Instance = Local.Instance;
      export namespace Types {
         export interface properties extends Component.Types.properties {
            voltage: number;
         }

         export interface state extends Component.Types.state { }

         export interface loadFunction extends Component.Types.loadFunction {
            (raw: any): Instance;
         }

         export type Instance = Local.Instance;
      }
   }

   namespace Local {
      import Types = PowerSchematic.Types;

      export const defaultState: Types.state = {
         location: { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 },
      }
      export const defaultProperties: Types.properties = {
         name: "power",
         voltage: 0
      }

      export class Instance extends Component.Instance implements Types.properties, Types.state {
         voltage: number;

         constructor(properties: Types.properties, state: Types.state) {
            super(properties, state);
            $(this.group.element).addClass("component " + this.name);
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

         draw() {
            if (this.voltage < 0) {
               drawPowerNegative(this);
            } else if (this.voltage > 0) {
               drawPowerPositive(this);
            } else {
               drawPowerGround(this);
            }
         }

         /** Builds and draws the components connectors */
         makeConnectors() {
            // Leads 
            let lead1End;
            lead1End = (this.voltage < 0)
               ? { x: 0, y: -10 } // negative
               : (this.voltage > 0)
                  ? { x: 0, y: 10 } // positive
                  : { x: 0, y: -10 }; // zero (ground)
            this.connectorSets = [
               [Component.Generics.makeConnector(this, "", "node", lead1End)]
            ]
         }

         transferFunction() { return [] };

      }

      export const loadInstance: Component.Types.loadFunction = (raw: any): Instance => {
         // Set default state
         let state = Object.assign({}, defaultState);
         // Set default properties
         let properties = Object.assign({}, defaultProperties);
         // If from a dasim
         if (raw.where) {
            state.location.e = Number(raw.where.X) || 0;
            state.location.f = Number(raw.where.Y) || 0;
         }
         properties.voltage = raw.value || 0;
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

      function drawPowerPositive(component: Instance) {
         let text = Utility.getStandardForm(component.voltage, "V")
         component.group.append(
            Svg.Element.Rect.make(
               { x: 0, y: -8 }, { width: 40, height: 20 }, { x: 2, y: 2 }, "highlight highlightwithfill extrathick"),
            Svg.Element.Line.make(
               { x: -12, y: -5 }, { x: 12, y: -5 }, "line medium"),
            Svg.Element.Text.make(
               text, { x: 0, y: -9 }, "text bold"),
            Svg.Element.Line.make(
               { x: 0, y: -5 }, { x: 0, y: 10 }, "line thin")
         );
      }

      function drawPowerNegative(component: Instance) {
         let text = Utility.getStandardForm(component.voltage, "V")
         component.group.append(
            Svg.Element.Rect.make(
               { x: 0, y: 8 }, { width: 40, height: 20 }, { x: 2, y: 2 }, "highlight highlightwithfill extrathick"),
            Svg.Element.Line.make(
               { x: -12, y: 5 }, { x: 12, y: 5 }, "line medium"),
            Svg.Element.Text.make(
               text, { x: 0, y: 19 }, "text bold"),
            Svg.Element.Line.make(
               { x: 0, y: 5 }, { x: 0, y: -10 }, "line thin")
         );
      }

      function drawPowerGround(component: Instance) {
         component.group.append(
            Svg.Element.Rect.make(
               { x: 0, y: 5 }, { width: 40, height: 20 }, { x: 2, y: 2 }, "highlight highlightwithfill extrathick"),
            Svg.Element.Line.make(
               { x: -18, y: 0 }, { x: 18, y: 0 }, "line medium"),
            Svg.Element.Line.make(
               { x: -12, y: 5 }, { x: 12, y: 5 }, "line medium"),
            Svg.Element.Line.make(
               { x: -6, y: 10 }, { x: 6, y: 10 }, "line medium"),
            Svg.Element.Line.make(
               { x: 0, y: 0 }, { x: 0, y: -10 }, "line thin")
         );
      }

      export const makeInstance = getMaker(Instance, defaultProperties, defaultState,
         (component: Instance) => {
            $(component.group.element).addClass("component " + component.name);
            Addins.Selectable.init(component);
            Addins.ConnectionHighlights.init(component, false);
         }
      );
   }

   export const PowerSchematic = {
      defaultState: Local.defaultState,
      defaultProperties: Local.defaultProperties,
      Instance: Local.Instance,
      makeInstance: Local.makeInstance,
      loadInstance: Local.loadInstance
   }
}