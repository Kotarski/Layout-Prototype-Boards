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

      export class Instance extends Component.Instance implements Types.properties, Types.state {
         inductance: number;
         joints: [Vector, Vector];

         constructor(values: Types.properties & Types.state) {
            super(values);
            $(this.group.element).addClass("component " + this.name);
            this.joints = values.joints;
            this.inductance = values.inductance;
         }

         getProperties(): Types.properties {
            return Utility.deepCopy({
               name: this.name,
               inductance: this.inductance,
            });
         }

         getState(): Types.state {
            return Utility.deepCopy({
               joints: this.joints,
               disabled: this.disabled
            });
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

      export const defaults: Types.state & Types.properties = {
         joints: [{ x: 0, y: 0 }, { x: 40, y: 40 }],
         disabled: false,
         name: "inductor",
         inductance: 0
      }

      const deriveJoints = (orientation: "LR" | "RL" | "UD" | "DU", where: Vector) => {
         const baseJoints = ({
            LR: [{ x: -30, y: 0 }, { x: 30, y: 0 }],
            UD: [{ x: 0, y: -30 }, { x: 0, y: 30 }],
            RL: [{ x: 30, y: 0 }, { x: -30, y: 0 }],
            DU: [{ x: 0, y: 30 }, { x: 0, y: -30 }]
         })[orientation] as [Vector, Vector];
         return vector(baseJoints).sumWith(where).vectors;
      }

      export const loadInstance: Component.Types.loadFunction = (raw: any): Instance => {
         const name = ValueCheck.validate("string", defaults.name)(raw.name);
         const inductance = ValueCheck.validate("number", defaults.inductance)(raw.inductance || raw.value);
         //Joints Block
         const orientations: ["LR", "RL", "UD", "DU"] = ["LR", "RL", "UD", "DU"];
         const orientation = ValueCheck.validate(orientations, "LR")(raw.orientation, false);
         const where = ValueCheck.where({ x: 0, y: 0 })(raw.where, false);
         const jointTest = ValueCheck.joints(defaults.joints);
         const joints = jointTest(raw.joints || deriveJoints(orientation, where));

         return makeInstance({ name, inductance, joints, }, true);
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

   export const InductorSchematic = {

      Instance: Local.Instance,
      makeInstance: Local.makeInstance,
      loadInstance: Local.loadInstance
   }
}