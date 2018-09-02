
namespace Circuit.Component {

   export namespace OpAmpSchematic {
      export type Instance = Local.Instance;
      export namespace Types {
         export interface properties extends Component.Types.properties {
            offsetVoltage: number;
         }

         export interface state extends Component.Types.state {
            joints: [Vector, Vector, Vector, Vector, Vector];
         }

         export interface loadFunction extends Component.Types.loadFunction {
            (raw: any): (Instance | [PowerSchematic.Instance, PowerSchematic.Instance, Instance]);
         }

         export type Instance = Local.Instance;
      }
   }

   namespace Local {
      import Types = OpAmpSchematic.Types;

      export const defaultState: Types.state = {
         joints: [{ x: -30, y: -10 }, { x: -30, y: +10 }, { x: 40, y: 0 }, { x: 0, y: -20 }, { x: 0, y: 20 }]
      }
      export const defaultProperties: Types.properties = {
         name: "opAmp",
         offsetVoltage: 0
      }

      export class Instance extends Component.Instance implements Types.properties, Types.state {
         offsetVoltage: number;
         joints: [Vector, Vector, Vector, Vector, Vector];

         constructor(properties: Types.properties, state: Types.state) {
            super(properties, state);
            $(this.group.element).addClass("component " + this.name);
            this.joints = state.joints;
            this.offsetVoltage = properties.offsetVoltage;
         }

         getProperties(): Types.properties {
            return {
               name: this.name,
               offsetVoltage: this.offsetVoltage
            }
         }

         getState(): Types.state {
            return {
               joints: this.joints,
            }
         }

         draw() {
            this.group.prepend(Svg.Element.Group.OpAmp.Schematic.make(this.joints[0], this.joints[1], this.joints[2], this.joints[3], this.joints[4], "body"))
         }

         makeConnectors() {

            let [posPower, negPower] = (this.joints[3].y < this.joints[4].y)
               ? [this.joints[3], this.joints[4]]
               : [this.joints[4], this.joints[3]];

            this.connectorSets = [
               [//Component.Generics.makeConnector(this, "nc", "node", {???}),//8
                  Component.Generics.makeConnector(this, "vcc+", "node", posPower, "v+"),//7
                  Component.Generics.makeConnector(this, "out", "node", this.joints[2], "o"),//6
                  //Component.Generics.makeConnector(this, "offset n1", "node", {???}),//5
                  //Component.Generics.makeConnector(this, "offset n2", "node", {???}),//1
                  Component.Generics.makeConnector(this, "in-", "node", this.joints[1], "i-"),//2
                  Component.Generics.makeConnector(this, "in+", "node", this.joints[0], "i+"),//3
                  Component.Generics.makeConnector(this, "vcc-", "node", negPower, "v-"),//4
               ]
            ];
         }

         transferFunction() { return [] };

      }

      export const loadInstance: Component.Types.loadFunction = (raw: any): (Instance | [PowerSchematic.Instance, PowerSchematic.Instance, Instance]) => {
         let state: Global.Types.DeepPartial<typeof defaultState> = (raw.state) ?
            {
               joints: (vector.isVectorArray(raw.state.joints) && raw.state.joints.length === 5)
                  ? vector.standardise(raw.state.joints as AnyVector[])
                  : undefined
            } : {
               joints: (() => {
                  if (["LR", "RL"].includes(raw.orientation) && ["inverting", "non-inverting"].includes(raw.whichInputAtTop)) {
                     let baseJoints = ({
                        //              In Inverting        In Non-Inverting    Out                  Power Positive/Negative
                        "LRinverting": [{ x: -30, y: -10 }, { x: -30, y: +10 }, { x: +40, y: 0 }, { x: 0, y: -20 }, { x: 0, y: +20 }],
                        "RLinverting": [{ x: +30, y: -10 }, { x: +30, y: +10 }, { x: -40, y: 0 }, { x: 0, y: -20 }, { x: 0, y: +20 }],
                        "LRnon-inverting": [{ x: -30, y: +10 }, { x: -30, y: -10 }, { x: +40, y: 0 }, { x: 0, y: +20 }, { x: 0, y: -20 }],
                        "RLnon-inverting": [{ x: +30, y: +10 }, { x: +30, y: -10 }, { x: -40, y: 0 }, { x: 0, y: +20 }, { x: 0, y: -20 }],
                     } as { [key: string]: [Vector, Vector, Vector, Vector, Vector] })[raw.orientation + raw.whichInputAtTop]

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
               offsetVoltage: raw.properties.offsetVoltage,
            } : {
               offsetVoltage: raw.offsetVoltage,
            };

         if ((raw.minOutput) && (raw.maxOutput)) {
            let offset: Vector = (raw.where && vector.isVector(raw.where))
               ? vector(raw.where as AnyVector).vector
               : { x: 0, y: 0 }

            // Also create the power leads
            let topPower = PowerSchematic.makeInstance(
               { voltage: raw.maxOutput || 5 }, {
                  joints: vector([{ x: 0, y: -20 }]).sumWith(offset).vectors
               }, true
            );

            let bottomPower = PowerSchematic.makeInstance(
               { voltage: raw.minOutput || -5 }, {
                  joints: vector([{ x: 0, y: 20 }]).sumWith(offset).vectors
               }, true
            );

            let opAmp = makeInstance(properties, state, true);

            let instances: [PowerSchematic.Instance, PowerSchematic.Instance, Instance] = [
               topPower,
               bottomPower,
               opAmp,
            ];

            return instances
         } else {
            return makeInstance(properties, state, true);
         }
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

   export const OpAmpSchematic = {
      defaultState: Local.defaultState,
      defaultProperties: Local.defaultProperties,
      Instance: Local.Instance,
      makeInstance: Local.makeInstance,
      loadInstance: Local.loadInstance
   }
}