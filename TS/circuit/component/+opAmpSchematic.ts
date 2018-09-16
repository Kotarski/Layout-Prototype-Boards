
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

      export class Instance extends Component.Instance implements Types.properties, Types.state {
         offsetVoltage: number;
         joints: [Vector, Vector, Vector, Vector, Vector];

         constructor(values: Types.properties & Types.state) {
            super(values);
            $(this.group.element).addClass("component " + this.name);
            this.joints = values.joints;
            this.offsetVoltage = values.offsetVoltage;
         }

         getProperties(): Types.properties {
            return Utility.deepCopy({
               name: this.name,
               offsetVoltage: this.offsetVoltage
            });
         }

         getState(): Types.state {
            return Utility.deepCopy({
               joints: this.joints,
               disabled: this.disabled
            });
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

      export const defaults: Types.state & Types.properties = {
         joints: [{ x: -30, y: -10 }, { x: -30, y: +10 }, { x: 40, y: 0 }, { x: 0, y: -20 }, { x: 0, y: 20 }],
         disabled: false,
         name: "opAmp",
         offsetVoltage: 0
      }

      const deriveJoints = (orientation: "LR" | "RL", inputAtTop: "inverting" | "non-inverting", where: Vector) => {
         const [inHigh, inLow] = orientation === "LR"
            ? [{ x: -30, y: -10 }, { x: -30, y: +10 }]
            : [{ x: +30, y: -10 }, { x: +30, y: +10 }];

         const [inInverting, inNonInverting] = inputAtTop === "inverting"
            ? [inHigh, inLow] : [inLow, inHigh]

         const [out] = orientation === "LR"
            ? [{ x: +40, y: 0 }]
            : [{ x: -40, y: 0 }];

         const [powPositive, powNegative] = inputAtTop === "inverting"
            ? [{ x: 0, y: -20 }, { x: 0, y: +20 }]
            : [{ x: 0, y: +20 }, { x: 0, y: -20 }];

         return vector([inInverting, inNonInverting, out, powPositive, powNegative]).sumWith(where).vectors;
      }

      export const loadInstance: Component.Types.loadFunction = (raw: any): (Instance | [PowerSchematic.Instance, PowerSchematic.Instance, Instance]) => {


         const name = ValueCheck.validate("string", defaults.name)(raw.name);
         const offsetVoltage = ValueCheck.validate("number", defaults.offsetVoltage)(raw.offsetVoltage);
         //Joints Block
         const orientations: ["LR", "RL"] = ["LR", "RL"];
         const orientation = ValueCheck.validate(orientations, "LR")(raw.orientation, false);
         const inputsAtTop: ["inverting", "non-inverting"] = ["inverting", "non-inverting"]
         const inputAtTop = ValueCheck.validate(inputsAtTop, "non-inverting")(raw.whichInputAtTop);
         const where = ValueCheck.where({ x: 0, y: 0 })(raw.where, false);
         const jointTest = ValueCheck.joints(defaults.joints);
         const joints = jointTest(raw.joints || deriveJoints(orientation, inputAtTop, where));

         const values = { name, offsetVoltage, joints };


         if ((raw.minOutput) && (raw.maxOutput)) {
            let offset: Vector = (raw.where && vector.isVector(raw.where))
               ? vector(raw.where as AnyVector).vector
               : { x: 0, y: 0 }

            // Also create the power leads
            let topPower = PowerSchematic.makeInstance(
               {
                  voltage: raw.maxOutput || 5,
                  joints: vector([{ x: 0, y: -20 }]).sumWith(offset).vectors
               }, true
            );

            let bottomPower = PowerSchematic.makeInstance(
               {
                  voltage: raw.minOutput || -5,
                  joints: vector([{ x: 0, y: 20 }]).sumWith(offset).vectors
               }, true
            );

            let opAmp = makeInstance(values, true);

            let instances: [PowerSchematic.Instance, PowerSchematic.Instance, Instance] = [
               topPower,
               bottomPower,
               opAmp,
            ];

            return instances
         } else {
            return makeInstance(values, true);
         }
      }

      export const makeInstance = getMaker(Instance, defaults,
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

      Instance: Local.Instance,
      makeInstance: Local.makeInstance,
      loadInstance: Local.loadInstance
   }
}