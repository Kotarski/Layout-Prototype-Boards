namespace Circuit.Component {
   export namespace ResistorSchematic {
      export type Instance = Local.Instance;
      export namespace Types {
         export interface properties extends Component.Types.properties {
            resistance: number;
         }

         export interface state extends Component.Types.state {
            joints: [Vector, Vector];
         }

         export interface loadFunction extends Component.Types.loadFunction {
            (raw: any): Instance;
         }

         export type Instance = Local.Instance;
      }
   }

   namespace Local {
      import Types = ResistorSchematic.Types

      export class Instance extends Component.Instance implements Types.properties, Types.state {
         resistance: number;
         joints: [Vector, Vector];

         constructor(values: Types.properties & Types.state) {
            super(values);
            $(this.group.element).addClass("component " + this.name);
            this.joints = values.joints;
            this.resistance = values.resistance;
         }

         getProperties(): Types.properties {
            return Utility.deepCopy({
               name: this.name,
               resistance: this.resistance
            });
         }

         getState(): Types.state {
            return Utility.deepCopy({
               joints: this.joints,
               disabled: this.disabled
            });
         }

         draw() {
            this.group.prepend(Svg.Element.Group.Resistor.Schematic.make(
               this.resistance,
               this.joints[0],
               this.joints[1],
               "body"
            ));
         }


         /** Builds and draws the components connectors */
         makeConnectors() {
            this.connectorSets = [
               [Component.Generics.makeConnector(this, "", "node", this.joints[0]),
               Component.Generics.makeConnector(this, "", "node", this.joints[1]),]
            ]
         }

         transferFunction() { return [] };

      }

      export const defaults: Types.state & Types.properties = {
         joints: [{ x: 0, y: 0 }, { x: 40, y: 40 }],
         disabled: false,
         name: "resistor",
         resistance: 0
      }

      export const defaulter: ValueCheck.Defaulter<Types.state & Types.properties> = {
         name: ValueCheck.validate("string", "resistor"),
         disabled: ValueCheck.validate("boolean", false),
         joints: ValueCheck.joints<[Vector, Vector]>(
            [{ x: 0, y: 0 }, { x: 40, y: 40 }]
         ),
         resistance: ValueCheck.validate("number", 0)
      };

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
         const name = (raw.name);
         const resistance = (raw.resistance || raw.value);
         //Joints Block
         const orientations: ["LR", "RL", "UD", "DU"] = ["LR", "RL", "UD", "DU"];
         const orientation = ValueCheck.validate(orientations, "LR")(raw.orientation, false);
         const where = ValueCheck.where({ x: 0, y: 0 })(raw.where, false);
         const joints = (raw.joints || deriveJoints(orientation, where));

         return makeInstance({ name, resistance, joints, }, true);
      }

      export const makeInstance = getMaker(Instance, defaulter,
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

   export const ResistorSchematic = {

      Instance: Local.Instance,
      makeInstance: Local.makeInstance,
      loadInstance: Local.loadInstance
   }
}