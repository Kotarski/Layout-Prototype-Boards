namespace Circuit.Component {

   export namespace CapacitorSchematic {
      export type Instance = Local.Instance;
      export namespace Types {
         export interface properties extends Component.Types.properties {
            capacitance: number;
            isPolarised: boolean
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
      import Types = CapacitorSchematic.Types;

      export class Instance extends Component.Instance implements Types.properties, Types.state {
         capacitance: number;
         joints: [Vector, Vector];
         isPolarised: boolean;

         constructor(values: Types.properties & Types.state) {
            super(values);
            $(this.group.element).addClass("component " + this.name);
            this.joints = values.joints;
            this.capacitance = values.capacitance;
            this.isPolarised = values.isPolarised;
         }

         getProperties(): Types.properties {
            return Utility.deepCopy({
               name: this.name,
               capacitance: this.capacitance,
               isPolarised: this.isPolarised
            });
         }

         getState(): Types.state {
            return Utility.deepCopy({
               joints: this.joints,
               disabled: this.disabled
            });
         }

         draw() {
            this.group.prepend(Svg.Element.Group.Capacitor.Schematic.make(
               this.capacitance,
               this.isPolarised,
               this.joints[0],
               this.joints[1],
               "body"
            ));
         }

         /** Builds and draws the components connectors */
         makeConnectors() {
            let [lead1Name, lead2Name] = (this.isPolarised) ? ["cathode", "anode"] : ["", ""];

            this.connectorSets = [[
               Component.Generics.makeConnector(this, lead1Name, "node", this.joints[0]),
               Component.Generics.makeConnector(this, lead2Name, "node", this.joints[1]),
            ]]
         }

         transferFunction() { return [] };

      }

      export function validatePolarisation(polarisation: unknown, capacitance: unknown): boolean | undefined {
         const isPolarValid = ValueCheck.test<"polar" | "non-polar">(["polar", "non-polar"]);
         const isCapacitanceValid = ValueCheck.test("number");
         if (isPolarValid(polarisation)) {
            return polarisation === "polar";
         } else if (isCapacitanceValid(capacitance)) {
            return (capacitance > 1e-6);
         } else {
            return undefined;
         }
      }

      export const defaulter: ValueCheck.Defaulter<Types.state & Types.properties> = {
         name: ValueCheck.validate("string", "capacitor"),
         disabled: ValueCheck.validate("boolean", false),
         isPolarised: ValueCheck.validate("boolean", false),
         joints: ValueCheck.joints<[Vector, Vector]>(
            [{ x: 0, y: 0 }, { x: 40, y: 40 }]
         ),
         capacitance: ValueCheck.validate("number", 0)
      };

      const derivePolarisation = (capacitance: number, polarisation?: "polar" | "non-polar") => {
         const isPolarValid = ValueCheck.test<"polar" | "non-polar">(["polar", "non-polar"]);
         return isPolarValid(polarisation) ? polarisation === "polar" : (capacitance > 1e-6);
      }

      const deriveJoints = (orientation: "LR" | "RL" | "UD" | "DU", where: Vector) => {
         const baseJoints = ({
            LR: [{ x: -20, y: 0 }, { x: 20, y: 0 }],
            UD: [{ x: 0, y: -20 }, { x: 0, y: 20 }],
            RL: [{ x: 20, y: 0 }, { x: -20, y: 0 }],
            DU: [{ x: 0, y: 20 }, { x: 0, y: -20 }]
         })[orientation] as [Vector, Vector];
         return vector(baseJoints).sumWith(where).vectors;
      }

      export const loadInstance: Component.Types.loadFunction = (raw: any): Instance => {
         const name = (raw.name);
         const capacitance = (raw.capacitance || raw.value);
         //Polarisation Block
         const isPolarised = (raw.isPolarised || derivePolarisation(capacitance, raw.polarised));
         //Joints Block
         const orientations: ["LR", "RL", "UD", "DU"] = ["LR", "RL", "UD", "DU"];
         const orientation = ValueCheck.validate(orientations, "LR")(raw.orientation, false);
         const where = ValueCheck.where({ x: 0, y: 0 })(raw.where, false);
         const joints = (raw.joints || deriveJoints(orientation, where));

         return makeInstance({ name, capacitance, isPolarised, joints }, true);
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

   export const CapacitorSchematic = {

      Instance: Local.Instance,
      makeInstance: Local.makeInstance,
      loadInstance: Local.loadInstance
   }
}