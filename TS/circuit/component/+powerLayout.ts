namespace Circuit.Component {

   export namespace PowerLayout {
      export type Instance = Local.Instance;
      export namespace Types {
         export type properties = PowerSchematic.Types.properties;

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
      import Types = PowerLayout.Types;

      export class Instance extends Component.Instance implements Types.properties, Types.state {
         voltage: number;
         connectorSets: Component.Types.hole[][] = [];
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


         insertInto(element: SVGGraphicsElement) {
            Utility.Insert.before(this.group.element, element, ".component");
         }


         draw() {
            this.group.prepend(Svg.Element.Group.Power.Layout.make(this.voltage, this.joints[0], "body"))
         }

         /** Builds and draws the components connectors */
         makeConnectors() {
            this.connectorSets = [[
               Component.Generics.makeConnector(this, "", "hole", this.joints[0])
            ]]
         }

         transferFunction() { return [] };

      }

      export const defaults: Types.state & Types.properties = {
         joints: [{ x: 0, y: 40 }],
         disabled: false,
         name: "power",
         voltage: 0
      }

      export const defaulter: ValueCheck.Defaulter<Types.state & Types.properties> = {
         name: ValueCheck.validate("string", "power"),
         disabled: ValueCheck.validate("boolean", false),
         joints: ValueCheck.joints<[Vector]>(
            [{ x: 0, y: 40 }]
         ),
         voltage: ValueCheck.validate("number", defaults.voltage)
      };

      export const loadInstance: Component.Types.loadFunction = (raw: any): Instance => {
         const name = (raw.name);
         const voltage = (raw.voltage);
         const joints = (raw.joints);

         return makeInstance({ name, voltage, joints }, true);
      }

      export const makeInstance = getMaker(Instance, defaulter,
         (component: Instance) => {
            $(component.group.element).addClass(component.name);
            Addins.Graphical.init(component); Addins.Draggable.init(component);
            Addins.Selectable.init(component);
            Addins.ConnectionHighlights.init(component, true, getHighlightColor(component));
            Addins.WireCreation.init(component);
         }
      );

      function getHighlightColor(component: Instance): string[] {
         return [(component.voltage < 0)
            ? "blue" // negative
            : (component.voltage > 0)
               ? "red" // positive
               : "black" // zero (ground);
         ]
      }

   }

   export const PowerLayout = {

      Instance: Local.Instance,
      makeInstance: Local.makeInstance,
      loadInstance: Local.loadInstance
   }
}