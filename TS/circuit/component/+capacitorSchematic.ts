namespace Circuit.Component {

   export namespace CapacitorSchematic {
      export type Instance = Local.Instance;
      export namespace Types {
         export interface properties extends Component.Types.properties {
            capacitance: number;
            isPolarised: boolean
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
      import Types = CapacitorSchematic.Types;

      export const defaultState: Types.state = {
         location: { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 },
         orientation: "LR"
      }

      export const defaultProperties: Types.properties = {
         name: "capacitor",
         capacitance: 0,
         isPolarised: false
      }

      export class Instance extends Component.Instance implements Types.properties, Types.state {
         capacitance: number;
         orientation: "LR" | "UD" | "RL" | "DU";
         isPolarised: boolean;

         constructor(properties: Types.properties, state: Types.state) {
            super(properties, state);
            this.group.addClasses("component " + this.name);
            this.orientation = state.orientation;
            this.capacitance = properties.capacitance;
            this.isPolarised = properties.isPolarised;
         }

         getProperties(): Types.properties {
            return {
               name: this.name,
               capacitance: this.capacitance,
               isPolarised: this.isPolarised
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

            // Body lines & highlight
            let highlightSize = (isHorizontal) ? { width: 15, height: 30 } : { width: 30, height: 15 };

            this.group.append(new Svg.Elements.Graphics.Simples.Rect(
               { X: 0, Y: 0 }, highlightSize, { X: 2, Y: 2 }, "highlight highlightwithfill extrathick")
            );

            let body1Start, body2Start, body1End, body2End;
            [body1Start, body2Start, body1End, body2End] = (isHorizontal)
               ? [{ X: -4, Y: -15 }, { X: +4, Y: -15 }, { X: -4, Y: +15 }, { X: +4, Y: +15 }]
               : [{ X: -15, Y: -4 }, { X: -15, Y: +4 }, { X: +15, Y: -4 }, { X: +15, Y: +4 }];
            this.group.append(new Svg.Elements.Graphics.Simples.Line(body1Start, body1End, "line thick nocap"));
            this.group.append(new Svg.Elements.Graphics.Simples.Line(body2Start, body2End, "line thick nocap"));

            // Leads 
            let lead1Start, lead2Start, lead1End, lead2End;
            [lead1Start, lead2Start, lead1End, lead2End] = (isHorizontal)
               ? [{ X: -6, Y: 0 }, { X: 6, Y: 0 }, { X: -20, Y: 0 }, { X: 20, Y: 0 }]
               : [{ X: 0, Y: -6 }, { X: 0, Y: 6 }, { X: 0, Y: -20 }, { X: 0, Y: 20 }];
            this.group.append(new Svg.Elements.Graphics.Simples.Line(lead1Start, lead1End, "line thin"));
            this.group.append(new Svg.Elements.Graphics.Simples.Line(lead2Start, lead2End, "line thin"));

            //Text
            let textPosition = (isHorizontal) ? { X: 0, Y: -20 } : { X: -20, Y: 4 }
            let text = Utility.getStandardForm(this.capacitance, 'F');
            let anchorClass = (isHorizontal) ? "anchormid" : "anchorend";
            this.group.append(
               new Svg.Elements.Graphics.Simples.Text(text, textPosition, undefined, "text").addClasses(anchorClass)
            );

            //Polarisation symbol (+)
            if (this.isPolarised) {
               let isLRorUD = ["LR", "UD"].includes(this.orientation);
               let plus1Start, plus2Start, plus1End, plus2End;
               [plus1Start, plus2Start, plus1End, plus2End] = (isLRorUD)
                  ? [{ X: +15, Y: -10 }, { X: +11, Y: -6 }, { X: +7, Y: -10 }, { X: +11, Y: -14 }]
                  : [{ X: -15, Y: -10 }, { X: -11, Y: -6 }, { X: -7, Y: -10 }, { X: -11, Y: -14 }]

               let rotation = isHorizontal ? 0 : 90;

               //let transforms = [{ translate: this.centre }, { rotate: this.rotation }, { scale: inversionScale }];
               this.group.append(new Svg.Elements.Graphics.Simples.Line(plus1Start, plus1End, "line thin").rotate(rotation));
               this.group.append(new Svg.Elements.Graphics.Simples.Line(plus2Start, plus2End, "line thin").rotate(rotation));
            }
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

            let lead1Name = "";
            let lead2Name = "";
            if (this.isPolarised) {
               [lead1Name, lead2Name] = (isLRorUD)
                  ? ["cathode", "anode"]
                  : ["anode", "cathode"];
            }

            this.connectorSets = [[
               Component.Generics.makeConnector(this, lead1Name, "node", lead1End),
               Component.Generics.makeConnector(this, lead2Name, "node", lead2End),
            ]]
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
               } : {},
            };
         let properties: Global.Types.DeepPartial<typeof defaultProperties> = (raw.properties) ?
            {
               name: raw.properties.name,
               capacitance: raw.properties.capacitance,
               isPolarised: raw.properties.isPolarised,
            } : {
               capacitance: raw.value,
               isPolarised: (raw.polarised === "polar") ? true : Number(raw.value) ? (raw.value > 1e-6) : undefined
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

   export const CapacitorSchematic = {
      defaultState: Local.defaultState,
      defaultProperties: Local.defaultProperties,
      Instance: Local.Instance,
      makeInstance: Local.makeInstance,
      loadInstance: Local.loadInstance
   }
}