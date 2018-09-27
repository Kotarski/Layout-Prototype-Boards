namespace Circuit.Component {

   export namespace InductorLayout {
      export type Instance = Local.Instance;
      export namespace Types {
         export type properties = InductorSchematic.Types.properties;

         export interface state extends Component.Types.state {
            joints: [Vector, Vector];
         }

         export interface loadFunction extends Component.Types.loadFunction {
            (raw: any): Instance;
         }
      }
   }

   namespace Local {
      import Types = InductorLayout.Types;

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
            const [start, end]: Vector[] = this.joints;
            //Style and add lead and highlight
            //(Prepend so handles appear on top)
            this.group.prepend(
               Svg.Element.Group.Inductor.Layout.make(this.inductance, start, end, "body")
            );
         }

         insertInto(element?: SVGGraphicsElement) {
            Utility.Insert.last(this.group.element, element);
         }

         getConnections(): Component.Types.connector[][][] {
            return Generics.getComponentConnections(this, manifest.layout);
         }

         /** Builds the components connectors */
         makeConnectors() {
            this.connectorSets = [[
               Component.Generics.makeConnector(this, "", "pin", this.joints[0]),
               Component.Generics.makeConnector(this, "", "pin", this.joints[this.joints.length - 1]),
            ]]
         }

         transferFunction() { return [] };

      }

      export const defaulter: ValueCheck.Defaulter<Types.state & Types.properties> = {
         name: ValueCheck.validate("string", "inductor"),
         disabled: ValueCheck.validate("boolean", false),
         joints: ValueCheck.joints<[Vector, Vector]>(
            [{ x: 0, y: 0 }, { x: 80, y: 0 }]
         ),
         inductance: ValueCheck.validate("number", 0)
      };

      export const load: Component.Types.loadFunction = (raw: any): Instance => {
         const name = (raw.name);
         const inductance = (raw.inductance);
         const joints = (raw.joints);

         return makeInstance({ name, inductance, joints }, true);
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

   export const InductorLayout = {

      instance: Local.Instance,
      make: Local.makeInstance,
      load: Local.load
   }
}