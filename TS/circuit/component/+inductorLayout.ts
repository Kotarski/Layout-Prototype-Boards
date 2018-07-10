namespace Circuit.Component {

   export namespace InductorLayout {
      export type Instance = Local.Instance;
      export namespace Types {
         export type properties = InductorSchematic.Types.properties;

         export interface state extends Component.Types.state {
            joints: Global.Types.vector[];
         }

         export interface loadFunction extends Component.Types.loadFunction {
            (raw: any): Instance;
         }
      }
   }

   namespace Local {
      import Types = InductorLayout.Types;

      export const defaultState: Types.state = {
         location: { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 },
         joints: [{ X: 0, Y: 0 }, { X: 80, Y: 0 }]
      }
      export const defaultProperties: Types.properties = {
         name: "inductor",
         inductance: 0
      }

      export class Instance extends Component.Instance implements Types.properties, Types.state {
         inductance: number;
         joints: Global.Types.vector[];

         constructor(properties: Types.properties, state: Types.state) {
            super(properties, state);
            this.group.addClasses("component " + this.name);
            this.joints = state.joints;
            this.inductance = properties.inductance;
         }

         getProperties(): Types.properties {
            return {
               name: this.name,
               inductance: this.inductance,
            }
         }

         setProperties(properties: Types.properties) {
            this.inductance = properties.inductance;
            return this;
         }

         getState(): Types.state {
            return {
               location: this.group.transforms,
               joints: this.joints
            }
         }

         setState(state: Types.state) {
            this.group.transforms = state.location;
            this.joints = state.joints;
            return this;
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
            this.group.prepend([
               new Svg.Elements.Graphics.Simples.Path(leadPath, "lead"),
               new Svg.Elements.Graphics.Complexes.InductorBody(
                  joints[0], joints[joints.length - 1], "body")//.setValue(this.breakdownVoltage)
            ]);

         }

         /** Builds the components connectors */
         makeConnectors() {
            this.connectorSets = [[
               Component.Generics.makeConnector(this, "", "pin", this.joints[0]),
               Component.Generics.makeConnector(this, "", "pin", this.joints[this.joints.length - 1]),
            ]]
         }

      }

      export const loadInstance: Component.Types.loadFunction = (raw: any): Instance => {
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
               inductance: raw.properties.inductance,
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

   export const InductorLayout = {
      defaultState: Local.defaultState,
      defaultProperties: Local.defaultProperties,
      Instance: Local.Instance,
      makeInstance: Local.makeInstance,
      loadInstance: Local.loadInstance
   }
}