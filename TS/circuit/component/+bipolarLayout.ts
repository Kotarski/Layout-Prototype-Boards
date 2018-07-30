namespace Circuit.Component {
   export namespace BipolarLayout {
      export type Instance = Local.Instance;
      export namespace Types {
         export type properties = BipolarSchematic.Types.properties;

         export interface state extends Component.Types.state {
            joints: Vector[];
         }

         export interface loadFunction extends Component.Types.loadFunction {
            (raw: any): Instance;
         }
      }
   }

   namespace Local {
      import Types = BipolarLayout.Types;

      export const defaultState: Types.state = {
         location: { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 },
         joints: [{ x: 0, y: 0 }, { x: 20, y: -20 }, { x: 40, y: 0 }]
      }
      export const defaultProperties: Types.properties = {
         name: "bipolar",
         currentGain: 0,
         type: "NPN"
      };

      export class Instance extends Component.Instance implements Types.properties, Types.state {
         currentGain: number;
         type: "NPN" | "PNP"
         joints: Vector[];

         constructor(properties: Types.properties, state: Types.state) {
            super(properties, state);
            $(this.group.element).addClass("component " + this.name);
            this.joints = state.joints;
            this.type = properties.type;
            this.currentGain = properties.currentGain;
         }

         getProperties(): Types.properties {
            return {
               name: this.name,
               currentGain: this.currentGain,
               type: this.type
            }
         }

         getState(): Types.state {
            return {
               location: this.location,
               joints: this.joints
            }
         }

         draw() {
            let emitterEnd = this.joints[0];
            let collectorEnd = this.joints[1];
            let baseEnd = this.joints[2];

            let centre = vector(emitterEnd, collectorEnd, baseEnd).centre().vector;

            let rotation = vector(emitterEnd).getAngleTo(baseEnd);

            let [emitterStart, collectorStart, baseStart]: Vector[] = vector(
               { x: - 12, y: 3 }, { x: 0, y: 3 }, { x: 12, y: 3 }
            ).rotate(-rotation).sumWith(centre).vectors;

            let joints = [
               [emitterStart, emitterEnd],
               [collectorStart, collectorEnd],
               [baseStart, baseEnd],
            ]

            //Style and add lead and highlight
            //(Prepend so handles appear on top)
            this.group.prepend(
               Svg.Element.Path.make(joints, "lead"),
               Svg.Element.Group.BipolarBody.make(this.type, centre, rotation, "body")
            );

         }

         /** Builds the components connectors */
         makeConnectors() {
            if (this.type === "PNP") {
               this.connectorSets = [[
                  Component.Generics.makeConnector(this, "base", "pin", this.joints[2]),
                  Component.Generics.makeConnector(this, "emitter", "pin", this.joints[0]),
                  Component.Generics.makeConnector(this, "collector", "pin", this.joints[1])
               ]];
            } else {
               this.connectorSets = [[
                  Component.Generics.makeConnector(this, "base", "pin", this.joints[2]),
                  Component.Generics.makeConnector(this, "collector", "pin", this.joints[1]),
                  Component.Generics.makeConnector(this, "emitter", "pin", this.joints[0])
               ]];
            }
         }

         transferFunction() { return [] };

      }

      export const loadInstance: Component.Types.loadFunction = (raw: any): Instance => {

         let state: Global.Types.DeepPartial<typeof defaultState> = (raw.state) ?
            {
               location: raw.state.location,
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


