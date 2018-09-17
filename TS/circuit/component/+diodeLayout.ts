namespace Circuit.Component {

   export namespace DiodeLayout {
      export type Instance = Local.Instance;
      export namespace Types {
         export type properties = DiodeSchematic.Types.properties;

         export interface state extends Component.Types.state {
            joints: [Vector, Vector];
         }

         export interface loadFunction extends Component.Types.loadFunction {
            (raw: any): Instance;
         }
      }
   }

   namespace Local {
      import Types = DiodeLayout.Types;

      export class Instance extends Component.Instance implements Types.properties, Types.state {
         breakdownVoltage: number;
         saturationCurrent: number;
         joints: [Vector, Vector];
         color: string;

         constructor(values: Types.properties & Types.state) {
            super(values);
            $(this.group.element).addClass("component " + this.name);
            this.joints = values.joints;
            this.saturationCurrent = values.saturationCurrent;
            this.breakdownVoltage = values.breakdownVoltage;
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
               ? Svg.Element.Group.Diode.Layout.make(this.breakdownVoltage, start, end, "body")
               : Svg.Element.Group.Led.Layout.make(this.breakdownVoltage, this.color, start, end, "body led");

            this.group.prepend(
               diodeBody
            );
         }

         /** Builds the components connectors */
         makeConnectors() {
            this.connectorSets = [[
               Component.Generics.makeConnector(this, "anode", "pin", this.joints[0], "+"),
               Component.Generics.makeConnector(this, "cathode", "pin", this.joints[this.joints.length - 1], "-"),
            ]]
         }

         transferFunction() { return [] };

      }

      export const defaults: Types.state & Types.properties = {
         joints: [{ x: 0, y: 0 }, { x: 80, y: 0 }],
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
            [{ x: 0, y: 0 }, { x: 80, y: 0 }]
         ),
         breakdownVoltage: ValueCheck.validate("number", 0),
         saturationCurrent: ValueCheck.validate("number", 0),
         color: ValueCheck.color(defaults.color)
      };

      export const loadInstance: Component.Types.loadFunction = (raw: any): Instance => {
         const name = (raw.name);
         const breakdownVoltage = (raw.breakdownVoltage);
         const saturationCurrent = (raw.saturationCurrent);
         const color = (raw.color);
         const joints = (raw.joints);

         return makeInstance({ name, breakdownVoltage, saturationCurrent, color, joints }, true);
      }

      export const makeInstance = getMaker(Instance, defaulter,
         (component: Instance) => {
            $(component.group.element).addClass("component " + component.name);
            Addins.Graphical.init(component);
            Addins.Selectable.init(component);
            Addins.Draggable.init(component);
            Addins.Extendable.init(component);
            Addins.ConnectionHighlights.init(component);
         }
      );
   }

   export const DiodeLayout = {

      Instance: Local.Instance,
      makeInstance: Local.makeInstance,
      loadInstance: Local.loadInstance
   }
}