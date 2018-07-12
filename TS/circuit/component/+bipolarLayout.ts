namespace Circuit.Component {
   export namespace BipolarLayout {
      export type Instance = Local.Instance;
      export namespace Types {
         export type properties = BipolarSchematic.Types.properties;

         export interface state extends Component.Types.state {
            joints: Global.Types.vector[];
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
         joints: [{ X: 0, Y: 0 }, { X: 20, Y: -20 }, { X: 40, Y: 0 }]
      }
      export const defaultProperties: Types.properties = {
         name: "bipolar",
         currentGain: 0,
         type: "NPN"
      };

      export class Instance extends Component.Instance implements Types.properties, Types.state {
         currentGain: number;
         type: "NPN" | "PNP"
         joints: Global.Types.vector[];

         constructor(properties: Types.properties, state: Types.state) {
            super(properties, state);
            this.group.addClasses("component " + this.name);
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
               location: this.group.transforms,
               joints: this.joints
            }
         }

         draw() {

            let centre = {
               X: (this.joints[0].X + this.joints[1].X + this.joints[2].X) / 3,
               Y: (this.joints[0].Y + this.joints[1].Y + this.joints[2].Y) / 3,
            };

            let rotation = -Math.atan2(this.joints[2].Y - this.joints[0].Y, this.joints[2].X - this.joints[0].X) * 180 / Math.PI;

            let leadEmitterStart = Utility.Vector.rotate({ X: - 12, Y: 3 }, rotation);
            let leadCollectorStart = Utility.Vector.rotate({ X: 0, Y: 3 }, rotation);
            let leadBaseStart = Utility.Vector.rotate({ X: 12, Y: 3 }, rotation);

            let leadPath = "M " + this.joints[0].X + " " + this.joints[0].Y
               + "L " + (centre.X + leadEmitterStart.X) + " " + (centre.Y + leadEmitterStart.Y)
               + "M " + this.joints[1].X + " " + this.joints[1].Y
               + "L " + (centre.X + leadCollectorStart.X) + " " + (centre.Y + leadCollectorStart.Y)
               + "M " + this.joints[2].X + " " + this.joints[2].Y
               + "L " + (centre.X + leadBaseStart.X) + " " + (centre.Y + leadBaseStart.Y)

            //Style and add lead and highlight
            //(Prepend so handles appear on top)
            this.group.prepend([
               new Svg.Elements.Graphics.Simples.Path(leadPath, "lead"),
               new Svg.Elements.Graphics.Complexes.BipolarBody(
                  this.joints[0], this.joints[1], this.joints[2], "body"
               ).setValue(this.type /*+ " (" + Circuit.Component.Generics.formatValueText(this.currentGain, '') + ")"*/)
            ]);

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

      }

      export const loadInstance: Component.Types.loadFunction = (raw: any): Instance => {

         let state: Global.Types.DeepPartial<typeof defaultState> = (raw.state) ?
            {
               location: raw.state.location,
               joints: (raw.state.joints && (raw.state.joints.length === 3) && (raw.state.joints.every((j: Global.Types.vector) => {
                  return (('X' in j) && ('Y' in j) && (typeof j.X === 'number') && (typeof j.Y === 'number'));
               }))) ? raw.state.joints : undefined
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
            component.group.addClasses("component " + component.name);
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


