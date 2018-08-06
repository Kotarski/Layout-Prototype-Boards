namespace Circuit.Component {

   export namespace CapacitorSchematic {
      export type Instance = Local.Instance;
      export namespace Types {
         export interface properties extends Component.Types.properties {
            capacitance: number;
            isPolarised: boolean
         }

         export interface state extends Component.Types.state {
            joints: [Vector, Vector];
         }

         export interface loadFunction extends Component.Types.loadFunction {
            (raw: any): Instance;
         }
      }
   }

   namespace Local {
      import Types = CapacitorSchematic.Types;

      export const defaultState: Types.state = {
         location: { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 },
         joints: [{ x: 0, y: 0 }, { x: 40, y: 40 }]
      }

      export const defaultProperties: Types.properties = {
         name: "capacitor",
         capacitance: 0,
         isPolarised: false
      }

      export class Instance extends Component.Instance implements Types.properties, Types.state {
         capacitance: number;
         joints: [Vector, Vector];
         isPolarised: boolean;

         constructor(properties: Types.properties, state: Types.state) {
            super(properties, state);
            $(this.group.element).addClass("component " + this.name);
            this.joints = state.joints;
            this.capacitance = properties.capacitance;
            this.isPolarised = properties.isPolarised;
         }

         getProperties(): Types.properties {
            return {
               name: this.name,
               capacitance: this.capacitance,
               isPolarised: this.isPolarised
            }
         }

         getState(): Types.state {
            return {
               location: this.location,
               joints: this.joints
            }
         }

         draw() {
            this.group.prepend(Svg.Element.Group.Capacitor.Schematic.make(
               this.capacitance,
               this.isPolarised,
               this.joints[0],
               this.joints[1],
               "body"
            ));
         }

         /** Builds and draws the components connectors */
         makeConnectors() {
            let [lead1Name, lead2Name] = (this.isPolarised) ? ["cathode", "anode"] : ["", ""];

            this.connectorSets = [[
               Component.Generics.makeConnector(this, lead1Name, "node", this.joints[0]),
               Component.Generics.makeConnector(this, lead2Name, "node", this.joints[1]),
            ]]
         }

         transferFunction() { return [] };

      }

      export const loadInstance: Component.Types.loadFunction = (raw: any): Instance => {
         let state: Global.Types.DeepPartial<typeof defaultState> = (raw.state) ?
            {
               location: raw.state.location,
               joints: (vector.isVectorArray(raw.state.joints) && raw.state.joints.length === 2)
                  ? vector.standardise(raw.state.joints as AnyVector[])
                  : undefined
            } : {
               location: (raw.where) ? {
                  e: raw.where.X,
                  f: raw.where.Y
               } : {},
               joints: (["LR", "UD", "RL", "DU"].includes(raw.orientation))
                  ? ({
                     LR: [{ x: -20, y: 0 }, { x: 20, y: 0 }],
                     UD: [{ x: 0, y: -20 }, { x: 0, y: 20 }],
                     RL: [{ x: 20, y: 0 }, { x: -20, y: 0 }],
                     DU: [{ x: 0, y: 20 }, { x: 0, y: -20 }]
                  } as { [key: string]: [Vector, Vector] })[raw.orientation]
                  : undefined,
            };
         let properties: Global.Types.DeepPartial<typeof defaultProperties> = (raw.properties) ?
            {
               name: raw.properties.name,
               capacitance: raw.properties.capacitance,
               isPolarised: raw.properties.isPolarised,
            } : {
               capacitance: raw.value,
               isPolarised: (raw.polarised === "polar") ? true : Number(raw.value) ? (raw.value > 1e-6) : undefined
            };

         return makeInstance(properties, state, true);
      }

      export const makeInstance = getMaker(Instance, defaultProperties, defaultState,
         (component: Instance) => {
            $(component.group.element).addClass("component " + component.name);
            Addins.Selectable.init(component);
            Addins.ConnectionHighlights.init(component, false);
            Addins.Extendable.init(component);
            Addins.Draggable.init(component);
         }
      );
   }

   export const CapacitorSchematic = {
      defaultState: Local.defaultState,
      defaultProperties: Local.defaultProperties,
      Instance: Local.Instance,
      makeInstance: Local.makeInstance,
      loadInstance: Local.loadInstance
   }
}