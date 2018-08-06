namespace Circuit.Component {
   export namespace PowerSchematic {
      export type Instance = Local.Instance;
      export namespace Types {
         export interface properties extends Component.Types.properties {
            voltage: number;
         }

         export interface state extends Component.Types.state {
            joints: [Vector];
         }

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
         joints: [{ x: 0, y: 0 }]
      }
      export const defaultProperties: Types.properties = {
         name: "power",
         voltage: 0
      }

      export class Instance extends Component.Instance implements Types.properties, Types.state {
         voltage: number;
         joints: [Vector];

         constructor(properties: Types.properties, state: Types.state) {
            super(properties, state);
            $(this.group.element).addClass("component " + this.name);
            this.voltage = properties.voltage;
            this.joints = state.joints;
         }

         getProperties(): Types.properties {
            return {
               name: this.name,
               voltage: this.voltage
            }
         }

         getState(): Types.state {
            return {
               location: this.location,
               joints: this.joints
            }
         }
         draw() {
            this.group.prepend(Svg.Element.Group.Power.Schematic.make(this.voltage, this.joints[0]))
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

         let state: Global.Types.DeepPartial<typeof defaultState> = (raw.state) ?
            {
               location: raw.state.location,
               joints: (vector.isVectorArray(raw.state.joints) && raw.state.joints.length === 1)
                  ? vector.standardise(raw.state.joints as AnyVector[])
                  : undefined
            } : {
               location: (raw.where) ? {
                  e: raw.where.X,
                  f: raw.where.Y
               } : undefined,
               joints: undefined,
            };

         let properties: Global.Types.DeepPartial<typeof defaultProperties> = (raw.properties) ?
            {
               name: raw.properties.name,
               voltage: raw.properties.voltage,
            } : {
               voltage: raw.value,
            };

         return makeInstance(properties, state, true);
      }

      export const makeInstance = getMaker(Instance, defaultProperties, defaultState,
         (component: Instance) => {
            $(component.group.element).addClass("component " + component.name);
            Addins.Selectable.init(component);
            Addins.ConnectionHighlights.init(component, false);
            Addins.Draggable.init(component);
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