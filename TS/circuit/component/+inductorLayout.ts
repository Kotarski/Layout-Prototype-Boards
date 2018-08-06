namespace Circuit.Component {

   export namespace InductorLayout {
      export type Instance = Local.Instance;
      export namespace Types {
         export type properties = InductorSchematic.Types.properties;

         export interface state extends Component.Types.state {
            joints: [Vector, Vector];
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
         joints: [{ x: 0, y: 0 }, { x: 80, y: 0 }]
      }
      export const defaultProperties: Types.properties = {
         name: "inductor",
         inductance: 0
      }

      export class Instance extends Component.Instance implements Types.properties, Types.state {
         inductance: number;
         joints: [Vector, Vector];

         constructor(properties: Types.properties, state: Types.state) {
            super(properties, state);
            $(this.group.element).addClass("component " + this.name);
            this.joints = state.joints;
            this.inductance = properties.inductance;
         }

         getProperties(): Types.properties {
            return {
               name: this.name,
               inductance: this.inductance,
            }
         }

         getState(): Types.state {
            return {
               location: this.location,
               joints: this.joints
            }
         }

         draw() {
            const [start, end]: Vector[] = this.joints;
            //Style and add lead and highlight
            //(Prepend so handles appear on top)
            this.group.prepend(
               Svg.Element.Group.Inductor.Layout.make(this.inductance, start, end, "body")
            );
         }

         /** Builds the components connectors */
         makeConnectors() {
            this.connectorSets = [[
               Component.Generics.makeConnector(this, "", "pin", this.joints[0]),
               Component.Generics.makeConnector(this, "", "pin", this.joints[this.joints.length - 1]),
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
            $(component.group.element).addClass("component " + component.name);
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