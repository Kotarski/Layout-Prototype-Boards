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
         joints: Global.Types.vector[];

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

            let centre = {
               x: (this.joints[0].x + this.joints[1].x + this.joints[2].x) / 3,
               y: (this.joints[0].y + this.joints[1].y + this.joints[2].y) / 3,
            };

            let rotation = -Math.atan2(this.joints[2].y - this.joints[0].y, this.joints[2].x - this.joints[0].x) * 180 / Math.PI;

            let leadEmitterStart = Utility.Vector.rotate({ x: - 12, y: 3 }, rotation);
            let leadCollectorStart = Utility.Vector.rotate({ x: 0, y: 3 }, rotation);
            let leadBaseStart = Utility.Vector.rotate({ x: 12, y: 3 }, rotation);

            let leadPath = "M " + this.joints[0].x + " " + this.joints[0].y
               + "L " + (centre.x + leadEmitterStart.x) + " " + (centre.y + leadEmitterStart.y)
               + "M " + this.joints[1].x + " " + this.joints[1].y
               + "L " + (centre.x + leadCollectorStart.x) + " " + (centre.y + leadCollectorStart.y)
               + "M " + this.joints[2].x + " " + this.joints[2].y
               + "L " + (centre.x + leadBaseStart.x) + " " + (centre.y + leadBaseStart.y)

            //Style and add lead and highlight
            //(Prepend so handles appear on top)
            this.group.prepend(
               Svg.Element.Path.make(leadPath, "lead"),
               Svg.Element.Group.BipolarBody.make(
                  this.type, this.joints[0], this.joints[1], this.joints[2], "body"
               )
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
               joints: (raw.state.joints && (raw.state.joints.length === 3) && (raw.state.joints.every((j: Global.Types.vector) => {
                  return (('x' in j) && ('y' in j) && (typeof j.x === 'number') && (typeof j.y === 'number'));
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


