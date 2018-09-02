namespace Circuit.Component {

   export namespace InductorSchematic {
      export type Instance = Local.Instance;
      export namespace Types {
         export interface properties extends Component.Types.properties {
            inductance: number;
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
      import Types = InductorSchematic.Types;

      export const defaultState: Types.state = {
         joints: [{ x: 0, y: 0 }, { x: 40, y: 40 }]
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
               joints: this.joints
            }
         }
         draw() {
            this.group.prepend(Svg.Element.Group.Inductor.Schematic.make(
               this.inductance,
               this.joints[0],
               this.joints[1],
               "body"
            ));
         }


         /** Builds and draws the components connectors */
         makeConnectors() {
            this.connectorSets = [[
               Component.Generics.makeConnector(this, "", "node", this.joints[0]),
               Component.Generics.makeConnector(this, "", "node", this.joints[1]),
            ]];
         }

         transferFunction() { return [] };

      }

      export const loadInstance: Component.Types.loadFunction = (raw: any): Instance => {
         let state: Global.Types.DeepPartial<typeof defaultState> = (raw.state) ?
            {

               joints: (vector.isVectorArray(raw.state.joints) && raw.state.joints.length === 2)
                  ? vector.standardise(raw.state.joints as AnyVector[])
                  : undefined
            } : {
               joints: (() => {
                  if (["LR", "UD", "RL", "DU"].includes(raw.orientation)) {
                     let baseJoints = ({
                        LR: [{ x: -30, y: 0 }, { x: 30, y: 0 }],
                        UD: [{ x: 0, y: -30 }, { x: 0, y: 30 }],
                        RL: [{ x: 30, y: 0 }, { x: -30, y: 0 }],
                        DU: [{ x: 0, y: 30 }, { x: 0, y: -30 }]
                     } as { [key: string]: [Vector, Vector] })[raw.orientation];

                     let offset: Vector = (raw.where && vector.isVector(raw.where))
                        ? vector(raw.where as AnyVector).vector
                        : { x: 0, y: 0 }
                     return vector(baseJoints).sumWith(offset).vectors
                  } else {
                     return undefined;
                  }
               })()
            };
         let properties: Global.Types.DeepPartial<typeof defaultProperties> = (raw.properties) ?
            {
               name: raw.properties.name,
               inductance: raw.properties.inductance,
            } : {
               inductance: raw.value,
            };

         return makeInstance(properties, state, true);
      }

      export const makeInstance = getMaker(Instance, defaultProperties, defaultState,
         (component: Instance) => {
            $(component.group.element).addClass("component " + component.name);
            Addins.Selectable.init(component);
            Addins.ConnectionHighlights.init(component, false);
            Addins.Graphical.init(component);
            if (Constants.schematicManipulationEnabled) {
               Addins.Draggable.init(component);
               Addins.Extendable.init(component);
            }
         }
      );
   }

   export const InductorSchematic = {
      defaultState: Local.defaultState,
      defaultProperties: Local.defaultProperties,
      Instance: Local.Instance,
      makeInstance: Local.makeInstance,
      loadInstance: Local.loadInstance
   }
}