namespace Circuit.Component {

   export namespace DiodeSchematic {
      export type Instance = Local.Instance;
      export namespace Types {
         export interface properties extends Component.Types.properties {
            breakdownVoltage: number;
            saturationCurrent: number;
         }

         export interface state extends Component.Types.state {
            orientation: "LR" | "UD" | "RL" | "DU";
         }

         export interface loadFunction extends Component.Types.loadFunction {
            (raw: any): Instance;
         }
      }
   }

   namespace Local {
      import Types = DiodeSchematic.Types;

      export const defaultState: Types.state = {
         location: { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 },
         orientation: "LR"
      }
      export const defaultProperties: Types.properties = {
         name: "diode",
         breakdownVoltage: 0,
         saturationCurrent: 0
      }

      export class Instance extends Component.Instance implements Types.properties, Types.state {
         breakdownVoltage: number;
         saturationCurrent: number;
         orientation: "LR" | "UD" | "RL" | "DU";

         constructor(properties: Types.properties, state: Types.state) {
            super(properties, state);
            this.group.addClasses("component " + this.name);
            this.orientation = state.orientation;
            this.breakdownVoltage = properties.breakdownVoltage;
            this.saturationCurrent = properties.saturationCurrent;
            Addins.Selectable.init(this);
            Addins.ConnectionHighlights.init(this, false);
         }

         getProperties(): Types.properties {
            return {
               name: this.name,
               breakdownVoltage: this.breakdownVoltage,
               saturationCurrent: this.saturationCurrent
            }
         }

         getState(): Types.state {
            return {
               location: this.group.transforms,
               orientation: this.orientation
            }
         }

         draw() {
            let isHorizontal = ["LR", "RL"].includes(this.orientation);
            let isLRorUD = ["LR", "UD"].includes(this.orientation);

            let rotation = (isHorizontal) ? 0 : 90;
            let scale = (isLRorUD) ? { X: 1, Y: 1 } : { X: -1, Y: 1 };

            // Body & highlight
            this.group.append(new Svg.Elements.Graphics.Simples.Path(
               'M 12 0 L -12 12 L -12 -12 L 12 0 Z', "body highlight highlightwithfill extrathick"
            ).rotate(rotation).scale(scale, false));
            this.group.append(new Svg.Elements.Graphics.Simples.Path(
               'M 12 0 L -12 12 L -12 -12 L 12 0 Z', "body black"
            ).rotate(rotation).scale(scale, false));
            if (this.breakdownVoltage < 51) {
               this.group.append(new Svg.Elements.Graphics.Simples.Path(
                  'M 18 -12 L 12 -12 L 12 12 L 6 12', "line medium"
               ).rotate(rotation).scale(scale, false));
            } else {
               this.group.append(new Svg.Elements.Graphics.Simples.Path(
                  'M 12 -12 L 12 12', "line medium"
               ).rotate(rotation).scale(scale, false));
            }

            // Leads 
            let lead1Start, lead2Start, lead1End, lead2End;
            [lead1Start, lead2Start, lead1End, lead2End] = (isHorizontal)
               ? [{ X: -12, Y: 0 }, { X: 12, Y: 0 }, { X: -20, Y: 0 }, { X: 20, Y: 0 }]
               : [{ X: 0, Y: -12 }, { X: 0, Y: 12 }, { X: 0, Y: -20 }, { X: 0, Y: 20 }];
            this.group.append(new Svg.Elements.Graphics.Simples.Line(lead1Start, lead1End, "line thin"));
            this.group.append(new Svg.Elements.Graphics.Simples.Line(lead2Start, lead2End, "line thin"));

            // Text
            let textPosition = (isHorizontal) ? { X: 0, Y: -15 } : { X: -15, Y: 4 };
            let text = (this.breakdownVoltage < 51)
               ? Utility.getStandardForm(this.breakdownVoltage, 'V')
               : Utility.getStandardForm(this.saturationCurrent, 'A');

            let anchorClass = (isHorizontal) ? "anchormid" : "anchorend";
            this.group.append(
               new Svg.Elements.Graphics.Simples.Text(text, textPosition, undefined, "text").addClasses(anchorClass)
            );
         }


         /** Builds and draws the components connectors */
         makeConnectors() {
            let isHorizontal = ["LR", "RL"].includes(this.orientation);
            let isLRorUD = ["LR", "UD"].includes(this.orientation);
            // Leads 
            let lead1End, lead2End;
            [lead1End, lead2End] = (isHorizontal)
               ? [{ X: -20, Y: 0 }, { X: 20, Y: 0 }]
               : [{ X: 0, Y: -20 }, { X: 0, Y: 20 }];

            let lead1Name, lead2Name;
            [lead1Name, lead2Name] = (isLRorUD)
               ? ["anode", "cathode"]
               : ["cathode", "anode"];

            this.connectorSets = [[
               Component.Generics.makeConnector(this, lead1Name, "node", lead1End),
               Component.Generics.makeConnector(this, lead2Name, "node", lead2End),
            ]];

            if (!isLRorUD) this.connectorSets[0].reverse();
         }

         transferFunction() { return [] };

      }

      export const loadInstance: Component.Types.loadFunction = (raw: any): Instance => {
         let state: Global.Types.DeepPartial<typeof defaultState> = (raw.state) ?
            {
               orientation: (["LR", "UD", "RL", "DU"].includes(raw.state.orientation)) ? raw.state.orientation : undefined,
               location: raw.state.location
            } : {
               orientation: (["LR", "UD", "RL", "DU"].includes(raw.orientation)) ? raw.orientation : undefined,
               location: (raw.where) ? {
                  e: raw.where.X,
                  f: raw.where.Y
               } : undefined,
            };
         let properties: Global.Types.DeepPartial<typeof defaultProperties> = (raw.properties) ?
            {
               name: raw.properties.name,
               breakdownVoltage: raw.properties.breakdownVoltage,
               saturationCurrent: raw.properties.saturationCurrent,
            } : {
               breakdownVoltage: raw.breakdownVoltage,
               saturationCurrent: raw.saturationCurrent,
            };

         return makeInstance(properties, state, true);
      }

      export const makeInstance = getMaker(Instance, defaultProperties, defaultState,
         (component: Instance) => {
            component.group.addClasses("component " + component.name);
            Addins.Selectable.init(component);
            Addins.ConnectionHighlights.init(component, false);
         }
      );
   }


   export const DiodeSchematic = {
      defaultState: Local.defaultState,
      defaultProperties: Local.defaultProperties,
      Instance: Local.Instance,
      makeInstance: Local.makeInstance,
      loadInstance: Local.loadInstance
   }
}