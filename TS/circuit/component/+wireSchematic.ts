namespace Circuit.Component {

   export namespace WireSchematic {
      export namespace Types {
         export interface properties extends Component.Types.properties { }

         export interface state extends Component.Types.state {
            joints: Vector[];
         }
      }
   }

   namespace Local {
      import Types = WireSchematic.Types;

      export class Instance extends Component.Instance implements Types.properties, Types.state {
         joints: Vector[];
         connectorSets: Component.Types.node[][] = [];


         constructor(values: Types.properties & Types.state) {
            super(values);
            $(this.group.element).addClass("component " + this.name);
            this.joints = values.joints;
         }

         getProperties(): Types.properties {
            return Utility.deepCopy({
               name: this.name
            });
         }


         getState(): Types.state {
            return Utility.deepCopy({
               joints: this.joints,
               disabled: this.disabled
            });
         }

         draw() {
            this.group.prepend(Svg.Element.Path.make(this.joints, "line thin"));
         }

         /** Builds and draws the components connectors */
         makeConnectors() {
            let end1 = this.joints[0];
            let end2 = this.joints[this.joints.length - 1];

            this.connectorSets = [
               [Component.Generics.makeConnector(this, "", "node", end1),
               Component.Generics.makeConnector(this, "", "node", end2)]
            ]
         }

         insertInto(element: SVGGraphicsElement) {
            Utility.Insert.first(this.group.element, element);
         }


         transferFunction(from: Component.Types.connector): Component.Types.connector[] {
            return Utility.flatten2d(this.connectorSets.map(connectorSet =>
               connectorSet.filter(Utility.isNot(from))
            ));
         }
      }

      export const defaulter: ValueCheck.Defaulter<Types.state & Types.properties> = {
         name: ValueCheck.validate("string", "wire"),
         disabled: ValueCheck.validate("boolean", false),
         joints: ValueCheck.joints(
            [{ x: 0, y: 0 }, { x: 10, y: 10 }], l => l >= 2
         ),
      };

      export const loadInstance: Component.Types.loadFunction = (raw: any): Instance => {
         const name = (raw.name);
         //Joints Block
         const joints = (raw.joints);

         return makeInstance({ name, joints, }, true);
      }

      export const makeInstance = getMaker(Instance, defaulter,
         (component: Instance) => {
            $(component.group.element).addClass("component " + component.name);
            Addins.Junctions.init(component);
            Addins.Selectable.init(component);
            Addins.Graphical.init(component);
            if (Constants.schematicManipulationEnabled) {
               Addins.Draggable.init(component);
               Addins.Extendable.init(component, true, true);
            }
         }
      );
   }

   export const WireSchematic = {

      makeInstance: Local.makeInstance,
      loadInstance: Local.loadInstance,
      Instance: Local.Instance
   }
}