namespace Circuit.Component {
   export namespace BipolarLayout {
      export type Instance = Local.Instance;
      export namespace Types {
         export type properties = BipolarSchematic.Types.properties;

         export interface state extends Component.Types.state {
            joints: [Vector, Vector, Vector];
         }

         export interface loadFunction extends Component.Types.loadFunction {
            (raw: any): Instance;
         }
      }
   }

   namespace Local {
      import Types = BipolarLayout.Types;

      export const defaultState: Types.state = {
         joints: [{ x: 0, y: 0 }, { x: 20, y: -20 }, { x: 40, y: 0 }],
         disabled: false
      }
      export const defaultProperties: Types.properties = {
         name: "bipolar",
         currentGain: 0,
         type: "NPN"
      };

      export class Instance extends Component.Instance implements Types.properties, Types.state {
         currentGain: number;
         type: "NPN" | "PNP"
         joints: [Vector, Vector, Vector];

         constructor(properties: Types.properties, state: Types.state) {
            super(properties, state);
            $(this.group.element).addClass("component " + this.name);
            this.joints = state.joints;
            this.type = properties.type;
            this.currentGain = properties.currentGain;
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
            this.group.prepend(Svg.Element.Group.Bipolar.Layout.make(
               this.type,
               this.joints[0],
               this.joints[1],
               this.joints[2],
               "body"
            ));
         }

         /** Builds the components connectors */
         makeConnectors() {
            this.connectorSets = [[
               Component.Generics.makeConnector(this, "emitter", "pin", this.joints[0], "e"),
               Component.Generics.makeConnector(this, "collector", "pin", this.joints[1], "c"),
               Component.Generics.makeConnector(this, "base", "pin", this.joints[2], "b")
            ]];
         }

         transferFunction() { return [] };

      }

      export const loadInstance: Component.Types.loadFunction = (raw: any): Instance => {

         let state: Global.Types.DeepPartial<typeof defaultState> = (raw.state) ?
            {
               joints: (vector.isVectorArray(raw.state.joints) && raw.state.joints.length === 3)
                  ? vector.standardise(raw.state.joints as AnyVector[])
                  : undefined
            } : {};

         let properties: Global.Types.DeepPartial<typeof defaultProperties> = (raw.properties) ?
            {
               name: raw.properties.name,
               currentGain: raw.properties.currentGain,
               type: (["NPN", "PNP"].includes(raw.properties.type)) ? raw.properties.type : undefined
            } : {};

         return makeInstance(properties, state, true);
      }

      export const makeInstance = getMaker(Instance, defaultProperties, defaultState,
         (component: Instance) => {
            $(component.group.element).addClass("component " + component.name);
            Addins.Graphical.init(component);
            Addins.Draggable.init(component);
            Addins.Selectable.init(component);
            Addins.Extendable.init(component);
            Addins.ConnectionHighlights.init(component);
         }
      );
   }

   export const BipolarLayout = {
      defaultState: Local.defaultState,
      defaultProperties: Local.defaultProperties,
      Instance: Local.Instance,
      makeInstance: Local.makeInstance,
      loadInstance: Local.loadInstance
   }
}


