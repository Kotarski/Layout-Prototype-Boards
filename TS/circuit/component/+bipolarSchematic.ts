namespace Circuit.Component {

   export namespace BipolarSchematic {
      export type Instance = Local.Instance;
      export namespace Types {
         export interface properties extends Component.Types.properties {
            currentGain: number;
            type: "PNP" | "NPN";
         }

         export interface state extends Component.Types.state {
            orientation: "LR" | "RL";
         }

         export interface loadFunction extends Component.Types.loadFunction {
            (raw: any): Instance;
         }
      }
   }

   namespace Local {
      import Types = BipolarSchematic.Types;

      export const defaultState: Types.state = {
         location: { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 },
         orientation: "LR"
      }
      export const defaultProperties: Types.properties = {
         name: "bipolar",
         currentGain: 0,
         type: "NPN"
      }

      export class Instance extends Component.Instance implements Types.properties, Types.state {
         name: string = "bipolar";
         currentGain: number;
         type: "PNP" | "NPN";
         orientation: "LR" | "RL";

         constructor(properties: Types.properties, state: Types.state) {
            super(properties, state);
            $(this.group.element).addClass("component " + this.name);
            this.orientation = state.orientation;
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
               orientation: this.orientation
            }
         }

         draw() {
            const scale = (this.orientation === "LR") ? { x: 1, y: 1 } : { x: -1, y: 1 };

            // Highlight
            this.group.append(
               Svg.Element.Circle.make({ x: 0, y: 0 }, 30, "extrathick highlight").scale(scale, true)
            );

            // Body lines
            this.group.append(
               //stubBase
               Svg.Element.Line.make({ x: -15, y: 0 }, { x: -50, y: 0 }, "line thin").scale(scale),
               //stubCollector
               Svg.Element.Line.make({ x: +10, y: -20 }, { x: +10, y: -50 }, "line thin").scale(scale),
               //stubEmitter
               Svg.Element.Line.make({ x: +10, y: +20 }, { x: +10, y: +50 }, "line thin").scale(scale),
               //lineBase
               Svg.Element.Line.make({ x: -15, y: -15 }, { x: -15, y: +15 }, "line medium-thick nocap").scale(scale),
               //lineCollector
               Svg.Element.Line.make({ x: -15, y: -5 }, { x: +10, y: -20 }, "line thin").scale(scale),
               //lineEmitter
               Svg.Element.Line.make({ x: -15, y: 5 }, { x: 10, y: 20 }, "line thin").scale(scale)
            );

            // Body Triangle
            if (this.type === "PNP") {
               this.group.append(Svg.Element.Path.make(
                  'M -7 0 L 7 6 L 7 -6 L -7 0 Z', "body black thin"
               ).translate({ x: -8, y: -9.2 }).rotate(-31).scale(scale, true));
            } else {
               this.group.append(Svg.Element.Path.make(
                  'M 7 0 L -7 6 L -7 -6 L 7 0 Z', "body black thin"
               ).translate({ x: 4, y: 16.4 }).rotate(31).scale(scale, true));
            }

            // Body Circle
            this.group.append(Svg.Element.Circle.make(
               { x: 0, y: 0 }, 30, "line medium nofill"
            ).scale(scale, true));

            //Text
            let textPosition = (this.orientation === "LR") ? { x: 32, y: 4 } : { x: -32, y: 4 }
            let text = Utility.getStandardForm(this.currentGain, '')
            let anchorClass = (this.orientation === "LR") ? "anchorstart" : "anchorend";
            this.group.append(
               Svg.Element.Text.make(text, textPosition, "text " + anchorClass)
            );
         }


         /** Builds and draws the components connectors */
         makeConnectors() {

            let con1Pos, con2Pos, con3Pos;
            [con1Pos, con2Pos, con3Pos] = (this.orientation === "LR")
               ? [{ x: -50, y: 0 }, { x: +10, y: -50 }, { x: +10, y: +50 }]
               : [{ x: +50, y: 0 }, { x: -10, y: -50 }, { x: -10, y: +50 }];


            if (this.type === "PNP") {
               this.connectorSets = [[
                  Component.Generics.makeConnector(this, "base", "node", con1Pos),
                  Component.Generics.makeConnector(this, "emitter", "node", con2Pos),
                  Component.Generics.makeConnector(this, "collector", "node", con3Pos)
               ]];
            } else {
               this.connectorSets = [[
                  Component.Generics.makeConnector(this, "base", "node", con1Pos),
                  Component.Generics.makeConnector(this, "collector", "node", con2Pos),
                  Component.Generics.makeConnector(this, "emitter", "node", con3Pos)
               ]];
            }
         }

         transferFunction() { return [] };
      }

      export const loadInstance: Component.Types.loadFunction = (raw: any): Instance => {

         let state: Global.Types.DeepPartial<typeof defaultState> = (raw.state) ?
            {
               orientation: (["LR", "RL"].includes(raw.state.orientation)) ? raw.state.orientation : undefined,
               location: raw.state.location
            } : {
               orientation: (["LR", "RL"].includes(raw.orientation)) ? raw.orientation : undefined,
               location: (raw.where) ? {
                  e: raw.where.X,
                  f: raw.where.Y
               } : undefined,
            };
         let properties: Global.Types.DeepPartial<typeof defaultProperties> = (raw.properties) ?
            {
               name: raw.properties.name,
               currentGain: raw.properties.currentGain,
               type: (["NPN", "PNP"].includes(raw.properties.type)) ? raw.properties.type : undefined
            } : {
               currentGain: raw.currentGain,
               type: (["NPN", "PNP"].includes(raw.type)) ? raw.type : undefined
            };

         return makeInstance(properties, state, true);
      }

      export const makeInstance = getMaker(Instance, defaultProperties, defaultState,
         (component: Instance) => {
            $(component.group.element).addClass("component " + component.name);
            Addins.Selectable.init(component);
            Addins.ConnectionHighlights.init(component, false);
         }
      );
   }

   export const BipolarSchematic = {
      defaultState: Local.defaultState,
      defaultProperties: Local.defaultProperties,
      Instance: Local.Instance,
      makeInstance: Local.makeInstance,
      loadInstance: Local.loadInstance
   }
}