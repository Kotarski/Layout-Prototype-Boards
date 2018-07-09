namespace Circuit.Component {
   export namespace ResistorSchematic {
      export type Instance = Local.Instance;
      export namespace Types {
         export interface properties extends Component.Types.properties {
            resistance: number;
         }

         export interface state extends Component.Types.state {
            orientation: "LR" | "UD" | "RL" | "DU";
         }

         export interface loadFunction extends Component.Types.loadFunction {
            (raw: any): Instance;
         }

         export type Instance = Local.Instance;
      }
   }

   namespace Local {
      import Types = ResistorSchematic.Types

      export const defaultState: Types.state = {
         location: { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 },
         orientation: "LR"
      }

      export const defaultProperties: Types.properties = {
         name: "resistor",
         resistance: 0
      }

      export class Instance extends Component.Instance implements Types.properties, Types.state {
         resistance: number;
         orientation: "LR" | "UD" | "RL" | "DU";

         constructor(properties: Types.properties, state: Types.state) {
            super(properties, state);
            this.group.addClasses("component " + this.name);
            this.orientation = state.orientation;
            this.resistance = properties.resistance;
         }

         getProperties(): Types.properties {
            return {
               name: this.name,
               resistance: this.resistance
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

            // Body & highlight
            let bodySize = (isHorizontal) ? { width: 46, height: 18 } : { width: 18, height: 46 };

            this.group.append(new Svg.Elements.Graphics.Simples.Rect(
               { X: 0, Y: 0 }, bodySize, { X: 2, Y: 2 }, "highlight highlightwithfill extrathick"
            ));

            this.group.append(new Svg.Elements.Graphics.Simples.Rect(
               { X: 0, Y: 0 }, bodySize, { X: 2, Y: 2 }, "body white"
            ));

            // Leads 
            let lead1Start, lead2Start, lead1End, lead2End;
            [lead1Start, lead2Start, lead1End, lead2End] = (isHorizontal)
               ? [{ X: -24, Y: 0 }, { X: 24, Y: 0 }, { X: -30, Y: 0 }, { X: 30, Y: 0 }]
               : [{ X: 0, Y: -24 }, { X: 0, Y: 24 }, { X: 0, Y: -30 }, { X: 0, Y: 30 }];
            this.group.append(new Svg.Elements.Graphics.Simples.Line(lead1Start, lead1End, "line thin"));
            this.group.append(new Svg.Elements.Graphics.Simples.Line(lead2Start, lead2End, "line thin"));

            //Text
            let textPosition = (isHorizontal) ? { X: 0, Y: -15 } : { X: -15, Y: 4 }
            let text = Component.Generics.formatValueText(this.resistance, '\u03A9' /*Ω*/)
            let anchorClass = (isHorizontal) ? "anchormid" : "anchorend";
            this.group.append(
               new Svg.Elements.Graphics.Simples.Text(text, textPosition, undefined, "text").addClasses(anchorClass)
            );
         }


         /** Builds and draws the components connectors */
         makeConnectors() {
            let isHorizontal = ["LR", "RL"].includes(this.orientation);
            // Leads 
            let lead1End, lead2End;
            [lead1End, lead2End] = (isHorizontal)
               ? [{ X: -30, Y: 0 }, { X: 30, Y: 0 }]
               : [{ X: 0, Y: -30 }, { X: 0, Y: 30 }];
            this.connectorSets = [
               [Component.Generics.makeConnector(this, "", "node", lead1End),
               Component.Generics.makeConnector(this, "", "node", lead2End),]
            ]
         }

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
               resistance: raw.properties.resistance,
            } : {
               resistance: raw.value,
            };

         return makeInstance(properties, state, true);
      }

      export const makeInstance = Generics.getMaker(Instance, defaultProperties, defaultState,
         (component: Instance) => {
            component.group.addClasses("component " + component.name);
            Addins.Selectable.init(component);
            Addins.ConnectionHighlights.init(component, false);
         }
      );
   }

   export const ResistorSchematic = {
      defaultState: Local.defaultState,
      defaultProperties: Local.defaultProperties,
      Instance: Local.Instance,
      makeInstance: Local.makeInstance,
      loadInstance: Local.loadInstance
   }
}