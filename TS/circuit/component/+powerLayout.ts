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

      export const defaultState: Types.state = {
         joints: [{ x: 0, y: 40 }],
         disabled: false
      }
      export const defaultProperties: Types.properties = {
         name: "power",
         voltage: 0
      }

      export class Instance extends Component.Instance implements Types.properties, Types.state {
         voltage: number;
         connectorSets: Component.Types.hole[][] = [];
         joints: [Vector];

         constructor(properties: Types.properties, state: Types.state) {
            super(properties, state);
            $(this.group.element).addClass("component " + this.name);
            this.voltage = properties.voltage;
            this.joints = state.joints;
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

      export const loadInstance: Component.Types.loadFunction = (raw: any): Instance => {

         let state: Global.Types.DeepPartial<typeof defaultState> = (raw.state) ?
            {
               joints: (vector.isVectorArray(raw.state.joints) && raw.state.joints.length === 1)
                  ? vector.standardise(raw.state.joints as AnyVector[])
                  : undefined
            } : {};

         let properties: Global.Types.DeepPartial<typeof defaultProperties> = (raw.properties) ?
            {
               name: raw.properties.name,
               voltage: raw.properties.voltage,
            } : {};

         return makeInstance(properties, state, true);
      }

      export const makeInstance = getMaker(Instance, defaultProperties, defaultState,
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
      defaultState: Local.defaultState,
      defaultProperties: Local.defaultProperties,
      Instance: Local.Instance,
      makeInstance: Local.makeInstance,
      loadInstance: Local.loadInstance
   }
}