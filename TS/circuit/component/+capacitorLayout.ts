namespace Circuit.Component {

   export namespace CapacitorLayout {
      export type Instance = Local.Instance;
      export namespace Types {
         export type properties = CapacitorSchematic.Types.properties;

         export interface state extends Component.Types.state {
            joints: [Vector, Vector];
         }

         export interface loadFunction extends Component.Types.loadFunction {
            (raw: any): Instance;
         }
      }
   }

   namespace Local {
      import Types = CapacitorLayout.Types;

      export class Instance extends Component.Instance implements Types.properties, Types.state {
         capacitance: number;
         isPolarised: boolean;
         joints: [Vector, Vector];

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
            const [start, end]: Vector[] = this.joints;
            //Style and add lead and highlight
            //(Prepend so handles appear on top)
            let capacitorBody = (this.isPolarised)
               ? Svg.Element.Group.Capacitor.Layout.Electrolytic.make(this.capacitance, start, end, "bodyelectrolytic")
               : Svg.Element.Group.Capacitor.Layout.Ceramic.make(this.capacitance, start, end, "bodyceramic")

            this.group.prepend(
               capacitorBody
            );
         }

         /** Builds the components connectors */
         makeConnectors() {
            if (this.isPolarised) {
               this.connectorSets = [[
                  Component.Generics.makeConnector(this, "cathode", "pin", this.joints[0], "-"),
                  Component.Generics.makeConnector(this, "anode", "pin", this.joints[1], "+"),
               ]]
            } else {
               this.connectorSets = [[
                  Component.Generics.makeConnector(this, "", "pin", this.joints[0]),
                  Component.Generics.makeConnector(this, "", "pin", this.joints[1]),
               ]]
            }


         }

         transferFunction() { return [] };

      }

      export const defaulter: ValueCheck.Defaulter<Types.state & Types.properties> = {
         name: ValueCheck.validate("string", "capacitor"),
         disabled: ValueCheck.validate("boolean", false),
         isPolarised: ValueCheck.validate("boolean", false),
         joints: ValueCheck.joints<[Vector, Vector]>(
            [{ x: 0, y: 0 }, { x: 80, y: 0 }]
         ),
         capacitance: ValueCheck.validate("number", 0)
      };

      export const loadInstance: Component.Types.loadFunction = (raw: any) => {
         const name = (raw.name);
         const capacitance = (raw.capacitance);
         const isPolarised = (raw.isPolarised);
         const joints = (raw.joints);

         return makeInstance({ name, capacitance, isPolarised, joints }, true);
      }


      export const makeInstance = getMaker(Instance, defaulter,
         (component: Instance) => {
            $(component.group.element).addClass("component " + component.name);
            Addins.Graphical.init(component); Addins.Draggable.init(component);
            Addins.Selectable.init(component);
            Addins.Extendable.init(component);
            Addins.ConnectionHighlights.init(component);
         }
      );
   }

   export const CapacitorLayout = {

      Instance: Local.Instance,
      makeInstance: Local.makeInstance,
      loadInstance: Local.loadInstance
   }
}
