namespace Circuit.Component {

   export namespace CapacitorLayout {
      export type Instance = Local.Instance;
      export namespace Types {
         export type properties = CapacitorSchematic.Types.properties;

         export interface state extends Component.Types.state {
            joints: Global.Types.vector[];
         }

         export interface loadFunction extends Component.Types.loadFunction {
            (raw: any): Instance;
         }
      }
   }

   namespace Local {
      import Types = CapacitorLayout.Types;

      export const defaultState: Types.state = {
         location: { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 },
         joints: [{ X: 0, Y: 0 }, { X: 80, Y: 0 }]
      }
      export const defaultProperties: Types.properties = {
         name: "capacitor",
         capacitance: 0,
         isPolarised: false
      }
      export class Instance extends Component.Instance implements Types.properties, Types.state {
         capacitance: number;
         isPolarised: boolean;
         joints: Global.Types.vector[];

         constructor(properties: Types.properties, state: Types.state) {
            super(properties, state);
            this.group.addClasses("component " + this.name);
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
               location: this.group.transforms,
               joints: this.joints
            }
         }

         draw() {
            let leadPath: string = "";

            // Just for ease
            let joints = this.joints //this.handles.map(h => h.position);

            //Start at the beginning, end at the end
            leadPath = "M " + joints[0].X + " " + joints[0].Y;
            leadPath += "L " + joints[joints.length - 1].X + " " + joints[joints.length - 1].Y;

            //Style and add lead and highlight
            //(Prepend so handles appear on top)
            let capacitorBody = (this.isPolarised)
               ? new Svg.Elements.Groups.CapacitorBodyElectrolytic(
                  joints[0], joints[joints.length - 1], "bodyelectrolytic").setValue(this.capacitance)
               : new Svg.Elements.Groups.CapacitorBodyCeramic(
                  joints[0], joints[joints.length - 1], "bodyceramic").setValue(this.capacitance)

            this.group.prepend([
               new Svg.Elements.Path(leadPath, "lead"),
               capacitorBody
            ]);

         }

         /** Builds the components connectors */
         makeConnectors() {
            let lead1Name = "";
            let lead2Name = "";
            if (this.isPolarised) {
               [lead1Name, lead2Name] = ["cathode", "anode"];
            }

            this.connectorSets = [[
               Component.Generics.makeConnector(this, lead1Name, "pin", this.joints[0]),
               Component.Generics.makeConnector(this, lead2Name, "pin", this.joints[this.joints.length - 1]),
            ]]
         }

         transferFunction() { return [] };

      }

      export const loadInstance: Component.Types.loadFunction = (raw: any) => {
         let state: Global.Types.DeepPartial<typeof defaultState> = (raw.state) ?
            {
               location: raw.state.location,
               joints: (raw.state.joints && (raw.state.joints.length === 2) && (raw.state.joints.every((j: Global.Types.vector) => {
                  return (('X' in j) && ('Y' in j) && (typeof j.X === 'number') && (typeof j.Y === 'number'));
               }))) ? raw.state.joints : undefined
            } : {};
         let properties: Global.Types.DeepPartial<typeof defaultProperties> = (raw.properties) ?
            {
               name: raw.properties.name,
               capacitance: raw.properties.capacitance,
               isPolarised: raw.properties.isPolarised,
            } : {};

         return makeInstance(properties, state, true);
      }


      export const makeInstance = getMaker(Instance, defaultProperties, defaultState,
         (component: Instance) => {
            component.group.addClasses("component " + component.name);
            Addins.Draggable.init(component);
            Addins.Selectable.init(component);
            Addins.Extendable.init(component);
            Addins.ConnectionHighlights.init(component);
         }
      );
   }

   export const CapacitorLayout = {
      defaultState: Local.defaultState,
      defaultProperties: Local.defaultProperties,
      Instance: Local.Instance,
      makeInstance: Local.makeInstance,
      loadInstance: Local.loadInstance
   }
}
