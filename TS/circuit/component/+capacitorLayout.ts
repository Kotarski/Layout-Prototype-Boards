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

      export const defaultState: Types.state = {
         joints: [{ x: 0, y: 0 }, { x: 80, y: 0 }],
         disabled: false
      }
      export const defaultProperties: Types.properties = {
         name: "capacitor",
         capacitance: 0,
         isPolarised: false
      }
      export class Instance extends Component.Instance implements Types.properties, Types.state {
         capacitance: number;
         isPolarised: boolean;
         joints: [Vector, Vector];

         constructor(properties: Types.properties, state: Types.state) {
            super(properties, state);
            $(this.group.element).addClass("component " + this.name);
            this.joints = state.joints;
            this.capacitance = properties.capacitance;
            this.isPolarised = properties.isPolarised;
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

      export const loadInstance: Component.Types.loadFunction = (raw: any) => {
         let state: Global.Types.DeepPartial<typeof defaultState> = (raw.state) ?
            {
               joints: (vector.isVectorArray(raw.state.joints) && raw.state.joints.length === 2)
                  ? vector.standardise(raw.state.joints as AnyVector[])
                  : undefined
            } : {};
         let properties: Global.Types.DeepPartial<typeof defaultProperties> = (raw.properties) ?
            {
               name: raw.properties.name,
               capacitance: raw.properties.capacitance,
               isPolarised: raw.properties.isPolarised,
            } : {};

         return makeInstance(properties, state, true);
      }


      export const makeInstance = getMaker(Instance, defaultProperties, defaultState,
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
      defaultState: Local.defaultState,
      defaultProperties: Local.defaultProperties,
      Instance: Local.Instance,
      makeInstance: Local.makeInstance,
      loadInstance: Local.loadInstance
   }
}
