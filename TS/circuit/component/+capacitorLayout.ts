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
         joints: [{ x: 0, y: 0 }, { x: 80, y: 0 }]
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
            let leadPath: string = "";

            // Just for ease
            let joints = this.joints //this.handles.map(h => h.position);

            //Start at the beginning, end at the end
            leadPath = "M " + joints[0].x + " " + joints[0].y;
            leadPath += "L " + joints[joints.length - 1].x + " " + joints[joints.length - 1].y;

            //Style and add lead and highlight
            //(Prepend so handles appear on top)
            let capacitorBody = (this.isPolarised)
               ? Svg.Element.Group.CapacitorBodyElectrolytic.make(
                  this.capacitance, joints[0], joints[joints.length - 1], "bodyelectrolytic")
               : Svg.Element.Group.CapacitorBodyCeramic.make(this.capacitance,
                  joints[0], joints[joints.length - 1], "bodyceramic")

            this.group.prepend([
               Svg.Element.Path.make(leadPath, "lead"),
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
                  return (('x' in j) && ('y' in j) && (typeof j.x === 'number') && (typeof j.y === 'number'));
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
            $(component.group.element).addClass("component " + component.name);
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
