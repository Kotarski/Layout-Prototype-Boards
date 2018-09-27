namespace Circuit.Component {
   namespace WireLayout {
      export type Instance = Local.Instance;
      export namespace Types {
         export type properties = Component.Types.properties;

         export interface state extends Component.Types.state {
            joints: Vector[];
            color: string;
         }

         export interface loadFunction extends Component.Types.loadFunction {
            (raw: any): Instance;
         }

         export type Instance = Local.Instance;
      }
   }

   namespace Local {
      import Types = WireLayout.Types;

      export class Instance extends Component.Instance implements Types.properties, Types.state {
         joints: Vector[];
         color: string;

         constructor(values: Types.properties & Types.state) {
            super(values);
            $(this.group.element).addClass("component " + this.name);
            this.joints = values.joints;
            this.color = values.color;
         }

         getProperties(): Types.properties {
            return Utility.deepCopy({
               name: this.name
            });
         }

         getState(): Types.state {
            return Utility.deepCopy({
               joints: this.joints,
               color: this.color,
               disabled: this.disabled
            });
         }

         draw() {
            this.group.prepend(Svg.Element.Group.Wire.Layout.make(
               this.joints,
               this.color,
               "body"
            ));
         }

         insertInto(element?: SVGGraphicsElement) {
            Utility.Insert.last(this.group.element, element);
         }

         getConnections(): Component.Types.connector[][][] {
            return Generics.getComponentConnections(this, manifest.layout);
         }

         /** Builds the components connectors */
         makeConnectors() {
            this.connectorSets = [
               [Component.Generics.makeConnector(this, "", "pin", this.joints[0]),
               Component.Generics.makeConnector(this, "", "pin", this.joints[this.joints.length - 1]),]
            ]
         }

         transferFunction(from: Component.Types.connector): Component.Types.connector[] {
            return Utility.flatten2d(this.connectorSets.map(connectorSet => connectorSet.filter(Utility.isNot(from))));
         }
      }
      export const defaulter: ValueCheck.Defaulter<Types.state & Types.properties> = {
         name: ValueCheck.validate("string", "wire"),
         disabled: ValueCheck.validate("boolean", false),
         joints: ValueCheck.joints(
            [{ x: 0, y: 0 }, { x: 80, y: 0 }], l => l >= 2
         ),
         color: ValueCheck.color("#545454")
      };

      export const load: Component.Types.loadFunction = (raw: any): Instance => {
         const name = (raw.name);
         const color = (raw.color || raw.colour);
         //Joints Block
         const joints = (raw.joints);

         return makeInstance({ name, color, joints }, true);
      }

      function getRecolorPosition(component: Instance): Vector {
         const angle = vector(component.joints[0]).getAngleTo(component.joints[1]);
         const offset = Utility.Polar.toVector(12, angle + 45);
         return vector(component.joints[0]).sumWith(offset).vector;
      }

      export const makeInstance = getMaker(Instance, defaulter,
         (component: Instance) => {
            $(component.group.element).addClass("component " + component.name);
            Addins.Graphical.init(component); Addins.Draggable.init(component);
            Addins.Selectable.init(component);
            Addins.Extendable.init(component, true, true, true);
            Addins.ConnectionHighlights.init(component);
            Addins.Recolorable.init(component, () => getRecolorPosition(component));
         }
      );
   }

   export const WireLayout = {

      instance: Local.Instance,
      make: Local.makeInstance,
      load: Local.load
   }
}
