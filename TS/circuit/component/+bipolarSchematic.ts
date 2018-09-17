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

      export class Instance extends Component.Instance implements Types.properties, Types.state {
         name: string = "bipolar";
         currentGain: number;
         type: "PNP" | "NPN";
         joints: [Vector, Vector, Vector];

         constructor(values: Types.properties & Types.state) {
            super(values);
            $(this.group.element).addClass("component " + this.name);
            this.joints = values.joints;
            this.type = values.type;
            this.currentGain = values.currentGain;
         }

         getProperties(): Types.properties {
            return Utility.deepCopy({
               name: this.name,
               currentGain: this.currentGain,
               type: this.type
            });
         }

         getState(): Types.state {
            return Utility.deepCopy({
               joints: this.joints,
               disabled: this.disabled
            });
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

      export const defaults: Types.state & Types.properties = {
         joints: [{ x: -50, y: 0 }, { x: +10, y: -50 }, { x: +10, y: +50 }],
         disabled: false,
         name: "bipolar",
         currentGain: 0,
         type: "NPN"
      }

      export const defaulter: ValueCheck.Defaulter<Types.state & Types.properties> = {
         name: ValueCheck.validate("string", "bipolar"),
         disabled: ValueCheck.validate("boolean", false),
         joints: ValueCheck.joints<[Vector, Vector, Vector]>(
            [{ x: -50, y: 0 }, { x: +10, y: -50 }, { x: +10, y: +50 }]
         ),
         currentGain: ValueCheck.validate("number", 0),
         type: ValueCheck.validate<"NPN" | "PNP">(["NPN", "PNP"], "NPN")
      };

      const deriveJoints = (orientation: "LR" | "RL", type: "NPN" | "PNP", where: Vector) => {
         const [emitter, collector] = type === "PNP"
            ? [{ x: 0, y: -50 }, { x: 0, y: +50 }]
            : [{ x: 0, y: +50 }, { x: 0, y: -50 }];

         const [base, offset] = orientation === "LR"
            ? [{ x: -60, y: 0 }, { x: +10 }]
            : [{ x: +60, y: 0 }, { x: -10 }];

         return vector([emitter, collector, base]).sumWith(where, offset).vectors;
      }

      export const loadInstance: Component.Types.loadFunction = (raw: any): Instance => {
         const name = (raw.name);
         const currentGain = (raw.currentGain);
         const type = (raw.type);
         // Joints Block
         const orientation = ValueCheck.validate<"LR" | "RL">(["LR", "RL"], "LR")(raw.orientation, false);
         const where = ValueCheck.where({ x: 0, y: 0 })(raw.where, false);
         const joints = (raw.joints || deriveJoints(orientation, type, where));

         return makeInstance({ name, currentGain, type, joints }, true);
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

   export const BipolarSchematic = {

      Instance: Local.Instance,
      makeInstance: Local.makeInstance,
      loadInstance: Local.loadInstance
   }
}