namespace Circuit.Component {
   export namespace PowerSchematic {
      export type Instance = Local.Instance;
      export namespace Types {
         export interface properties extends Component.Types.properties {
            voltage: number;
         }

         export interface state extends Component.Types.state {
            joints: [Vector];
         }

         export interface loadFunction extends Component.Types.loadFunction {
            (raw: any): Instance;
         }

         export type Instance = Local.Instance;
      }
   }

   namespace Local {
      import Types = PowerSchematic.Types;

      export class Instance extends Component.Instance implements Types.properties, Types.state {
         voltage: number;
         joints: [Vector];

         constructor(values: Types.properties & Types.state) {
            super(values);
            $(this.group.element).addClass("component " + this.name);
            this.voltage = values.voltage;
            this.joints = values.joints;
         }

         getProperties(): Types.properties {
            return Utility.deepCopy({
               name: this.name,
               voltage: this.voltage
            });
         }

         getState(): Types.state {
            return Utility.deepCopy({
               joints: this.joints,
               disabled: this.disabled
            });
         }
         draw() {
            this.group.prepend(Svg.Element.Group.Power.Schematic.make(this.voltage, this.joints[0]))
         }

         /** Builds and draws the components connectors */
         makeConnectors() {
            this.connectorSets = [
               [Component.Generics.makeConnector(this, "", "node", this.joints[0])]
            ]
         }

         transferFunction() { return [] };

      }

      export const defaults: Types.state & Types.properties = {
         joints: [{ x: 0, y: 0 }],
         disabled: false,
         name: "power",
         voltage: 0
      }

      export const defaulter: ValueCheck.Defaulter<Types.state & Types.properties> = {
         name: ValueCheck.validate("string", "power"),
         disabled: ValueCheck.validate("boolean", false),
         joints: ValueCheck.joints<[Vector]>(
            [{ x: 0, y: 0 }]
         ),
         voltage: ValueCheck.validate("number", defaults.voltage)
      };

      const deriveJoints = (voltage: number, where: Vector) => {
         const baseJoints = (voltage < 0)
            ? [{ x: 0, y: -10 }] // negative
            : (voltage > 0)
               ? [{ x: 0, y: 10 }] // positive
               : [{ x: 0, y: -10 }]; // zero (ground)
         return vector(baseJoints).sumWith(where).vectors;
      }

      export const loadInstance: Component.Types.loadFunction = (raw: any): Instance => {
         const name = (raw.name);
         const voltage = (raw.voltage || raw.value);
         //Joints Block
         const where = ValueCheck.where({ x: 0, y: 0 })(raw.where, false);
         const joints = (raw.joints || deriveJoints(voltage, where));

         return makeInstance({ name, voltage, joints, }, true);
      }

      export const makeInstance = getMaker(Instance, defaulter,
         (component: Instance) => {
            $(component.group.element).addClass("component " + component.name);
            Addins.Selectable.init(component);
            Addins.ConnectionHighlights.init(component, false);
            Addins.Graphical.init(component);
            if (Constants.schematicManipulationEnabled) {
               Addins.Draggable.init(component);
            }
         }
      );
   }

   export const PowerSchematic = {

      Instance: Local.Instance,
      makeInstance: Local.makeInstance,
      loadInstance: Local.loadInstance
   }
}