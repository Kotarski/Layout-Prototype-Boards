namespace Circuit.Component {

   export namespace DiodeSchematic {
      export type Instance = Local.Instance;
      export namespace Types {
         export interface properties extends Component.Types.properties {
            breakdownVoltage: number;
            saturationCurrent: number;
            color: string;
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
      import Types = DiodeSchematic.Types;

      export class Instance extends Component.Instance implements Types.properties, Types.state {
         breakdownVoltage: number;
         saturationCurrent: number;
         joints: [Vector, Vector];
         color: string;

         constructor(values: Types.properties & Types.state) {
            super(values);
            $(this.group.element).addClass("component " + this.name);
            this.joints = values.joints;
            this.breakdownVoltage = values.breakdownVoltage;
            this.saturationCurrent = values.saturationCurrent;
            this.color = values.color;
         }

         getProperties(): Types.properties {
            return Utility.deepCopy({
               name: this.name,
               breakdownVoltage: this.breakdownVoltage,
               saturationCurrent: this.saturationCurrent,
               color: this.color
            });
         }

         getState(): Types.state {
            return Utility.deepCopy({
               joints: this.joints,
               disabled: this.disabled
            });
         }

         draw() {
            const [start, end]: Vector[] = this.joints;
            //Style and add lead and highlight
            //(Prepend so handles appear on top)
            let diodeBody = (this.color === "N/A")
               ? Svg.Element.Group.Diode.Schematic.make(
                  this.breakdownVoltage, this.saturationCurrent, start, end, "bodyelectrolytic"
               )
               : Svg.Element.Group.Led.Schematic.make(
                  this.breakdownVoltage, this.saturationCurrent, this.color, start, end, "bodyceramic"
               )
            this.group.prepend(
               diodeBody
            );
         }

         insertInto(element?: SVGGraphicsElement) {
            Utility.Insert.last(this.group.element, element);
         }


         /** Builds and draws the components connectors */
         makeConnectors() {
            this.connectorSets = [[
               Component.Generics.makeConnector(this, "anode", "node", this.joints[0], "+"),
               Component.Generics.makeConnector(this, "cathode", "node", this.joints[1], "-"),
            ]];
         }

         getConnections(): Component.Types.connector[][][] {
            return Generics.getComponentConnections(this, manifest.schematic);
         }

         transferFunction() { return [] };

      }

      const defaults: Types.state & Types.properties = {
         joints: [{ x: 0, y: 0 }, { x: 40, y: 40 }],
         disabled: false,
         name: "diode",
         breakdownVoltage: 0,
         saturationCurrent: 0,
         color: "N/A"
      }

      export const defaulter: ValueCheck.Defaulter<Types.state & Types.properties> = {
         name: ValueCheck.validate("string", "diode"),
         disabled: ValueCheck.validate("boolean", false),
         joints: ValueCheck.joints<[Vector, Vector]>(
            [{ x: 0, y: 0 }, { x: 40, y: 40 }]
         ),
         breakdownVoltage: ValueCheck.validate("number", 0),
         saturationCurrent: ValueCheck.validate("number", 0),
         color: ValueCheck.color(defaults.color)
      };

      const deriveJoints = (orientation: "LR" | "RL" | "UD" | "DU", where: Vector) => {
         const baseJoints = ({
            LR: [{ x: -20, y: 0 }, { x: 20, y: 0 }],
            UD: [{ x: 0, y: -20 }, { x: 0, y: 20 }],
            RL: [{ x: 20, y: 0 }, { x: -20, y: 0 }],
            DU: [{ x: 0, y: 20 }, { x: 0, y: -20 }]
         })[orientation] as [Vector, Vector];
         return vector(baseJoints).sumWith(where).vectors;
      }

      export const load: Component.Types.loadFunction = (raw: any): Instance => {
         const name = (raw.name);
         const breakdownVoltage = (raw.breakdownVoltage);
         const saturationCurrent = (raw.saturationCurrent);
         const color = (raw.color || raw.colour);
         //Joints Block
         const orientations: ["LR", "RL", "UD", "DU"] = ["LR", "RL", "UD", "DU"];
         const orientation = ValueCheck.validate(orientations, "LR")(raw.orientation, false);
         const where = ValueCheck.where({ x: 0, y: 0 })(raw.where, false);
         const joints = (raw.joints || deriveJoints(orientation, where));

         return makeInstance({ name, breakdownVoltage, saturationCurrent, color, joints }, true);
      }

      export const makeInstance = getMaker(Instance, defaulter,
         (component: Instance) => {
            $(component.group.element).addClass("component " + component.name);
            Addins.Graphical.init(component);
            Addins.Selectable.init(component);
            Addins.ConnectionHighlights.init(component, false);
            if (Constants.schematicManipulationEnabled) {
               Addins.Draggable.init(component);
               Addins.Extendable.init(component);
            }
         }
      );
   }


   export const DiodeSchematic = {

      instance: Local.Instance,
      make: Local.makeInstance,
      load: Local.load
   }
}