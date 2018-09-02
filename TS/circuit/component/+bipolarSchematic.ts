namespace Circuit.Component {

   export namespace BipolarSchematic {
      export type Instance = Local.Instance;
      export namespace Types {
         export interface properties extends Component.Types.properties {
            currentGain: number;
            type: "PNP" | "NPN";
         }

         export interface state extends Component.Types.state {
            joints: [Vector, Vector, Vector];
         }

         export interface loadFunction extends Component.Types.loadFunction {
            (raw: any): Instance;
         }
      }
   }

   namespace Local {
      import Types = BipolarSchematic.Types;

      export const defaultState: Types.state = {
         joints: [{ x: -50, y: 0 }, { x: +10, y: -50 }, { x: +10, y: +50 }]
      }
      export const defaultProperties: Types.properties = {
         name: "bipolar",
         currentGain: 0,
         type: "NPN"
      }

      export class Instance extends Component.Instance implements Types.properties, Types.state {
         name: string = "bipolar";
         currentGain: number;
         type: "PNP" | "NPN";
         joints: [Vector, Vector, Vector];

         constructor(properties: Types.properties, state: Types.state) {
            super(properties, state);
            $(this.group.element).addClass("component " + this.name);
            this.joints = state.joints;
            this.type = properties.type;
            this.currentGain = properties.currentGain;
         }

         getProperties(): Types.properties {
            return {
               name: this.name,
               currentGain: this.currentGain,
               type: this.type
            }
         }

         getState(): Types.state {
            return {
               joints: this.joints
            }
         }

         draw() {
            //Style and add lead and highlight
            //(Prepend so handles appear on top)
            this.group.prepend(Svg.Element.Group.Bipolar.Schematic.make(
               this.type,
               this.currentGain,
               this.joints[0],
               this.joints[1],
               this.joints[2],
               "body"
            ));
         }


         /** Builds and draws the components connectors */
         makeConnectors() {
            this.connectorSets = [[
               Component.Generics.makeConnector(this, "emitter", "node", this.joints[0], "e"),
               Component.Generics.makeConnector(this, "collector", "node", this.joints[1], "c"),
               Component.Generics.makeConnector(this, "base", "node", this.joints[2], "b"),
            ]];
         }


         transferFunction() { return [] };
      }

      export const loadInstance: Component.Types.loadFunction = (raw: any): Instance => {

         let state: Global.Types.DeepPartial<typeof defaultState> = (raw.state) ?
            {
               joints: (vector.isVectorArray(raw.state.joints) && raw.state.joints.length === 3)
                  ? vector.standardise(raw.state.joints as AnyVector[])
                  : undefined
            } : {
               joints: (() => {
                  if (["LR", "RL"].includes(raw.orientation) && ["NPN", "PNP"].includes(raw.type)) {
                     let baseJoints = ({
                        //   Emitter             Collector           Base
                        LRPNP: [{ x: 0, y: -50 }, { x: 0, y: +50 }, { x: -60, y: 0 }],
                        RLPNP: [{ x: 0, y: -50 }, { x: 0, y: +50 }, { x: +60, y: 0 }],
                        LRNPN: [{ x: 0, y: +50 }, { x: 0, y: -50 }, { x: -60, y: 0 }],
                        RLNPN: [{ x: 0, y: +50 }, { x: 0, y: -50 }, { x: +60, y: 0 }],
                     } as { [key: string]: [Vector, Vector, Vector] })[raw.orientation + raw.type];

                     let offset: Vector = (raw.where && vector.isVector(raw.where))
                        ? vector(raw.where as AnyVector).sumWith({ x: (raw.orientation === "LR") ? 10 : -10 }).vector
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
               currentGain: raw.properties.currentGain,
               type: (["NPN", "PNP"].includes(raw.properties.type)) ? raw.properties.type : undefined
            } : {
               currentGain: raw.currentGain,
               type: (["NPN", "PNP"].includes(raw.type)) ? raw.type : undefined
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

   export const BipolarSchematic = {
      defaultState: Local.defaultState,
      defaultProperties: Local.defaultProperties,
      Instance: Local.Instance,
      makeInstance: Local.makeInstance,
      loadInstance: Local.loadInstance
   }
}