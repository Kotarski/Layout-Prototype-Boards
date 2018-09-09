namespace Circuit.Component {

   export namespace DiodeSchematic {
      export type Instance = Local.Instance;
      export namespace Types {
         export interface properties extends Component.Types.properties {
            breakdownVoltage: number;
            saturationCurrent: number;
            color: string;
         }

         export interface state extends Component.Types.state {
            joints: [Vector, Vector];
         }

         export interface loadFunction extends Component.Types.loadFunction {
            (raw: any): Instance;
         }
      }
   }

   namespace Local {
      import Types = DiodeSchematic.Types;

      export const defaultState: Types.state = {
         joints: [{ x: 0, y: 0 }, { x: 40, y: 40 }],
         disabled: false
      }
      export const defaultProperties: Types.properties = {
         name: "diode",
         breakdownVoltage: 0,
         saturationCurrent: 0,
         color: "N/A"
      }

      export class Instance extends Component.Instance implements Types.properties, Types.state {
         breakdownVoltage: number;
         saturationCurrent: number;
         joints: [Vector, Vector];
         color: string;

         constructor(properties: Types.properties, state: Types.state) {
            super(properties, state);
            $(this.group.element).addClass("component " + this.name);
            this.joints = state.joints;
            this.breakdownVoltage = properties.breakdownVoltage;
            this.saturationCurrent = properties.saturationCurrent;
            this.color = properties.color;
            Addins.Selectable.init(this);
            Addins.ConnectionHighlights.init(this, false);
         }

         getProperties(): Types.properties {
            return Utility.deepCopy({
               name: this.name,
               breakdownVoltage: this.breakdownVoltage,
               saturationCurrent: this.saturationCurrent,
               color: this.color
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
            let diodeBody = (this.color === "N/A")
               ? Svg.Element.Group.Diode.Schematic.make(
                  this.breakdownVoltage, this.saturationCurrent, start, end, "bodyelectrolytic"
               )
               : Svg.Element.Group.Led.Schematic.make(
                  this.breakdownVoltage, this.saturationCurrent, this.color, start, end, "bodyceramic"
               )
            this.group.prepend(
               diodeBody
            );
         }


         /** Builds and draws the components connectors */
         makeConnectors() {
            this.connectorSets = [[
               Component.Generics.makeConnector(this, "anode", "node", this.joints[0], "+"),
               Component.Generics.makeConnector(this, "cathode", "node", this.joints[1], "-"),
            ]];
         }

         transferFunction() { return [] };

      }

      export const loadInstance: Component.Types.loadFunction = (raw: any): Instance => {
         let state: Global.Types.DeepPartial<typeof defaultState> = (raw.state) ?
            {
               joints: (vector.isVectorArray(raw.state.joints) && raw.state.joints.length === 2)
                  ? vector.standardise(raw.state.joints as AnyVector[])
                  : undefined
            } : {
               joints: (() => {
                  if (["LR", "UD", "RL", "DU"].includes(raw.orientation)) {
                     let baseJoints = ({
                        LR: [{ x: -20, y: 0 }, { x: 20, y: 0 }],
                        UD: [{ x: 0, y: -20 }, { x: 0, y: 20 }],
                        RL: [{ x: 20, y: 0 }, { x: -20, y: 0 }],
                        DU: [{ x: 0, y: 20 }, { x: 0, y: -20 }]
                     } as { [key: string]: [Vector, Vector] })[raw.orientation];

                     let offset: Vector = (raw.where && vector.isVector(raw.where))
                        ? vector(raw.where as AnyVector).vector
                        : { x: 0, y: 0 }
                     return vector(baseJoints).sumWith(offset).vectors
                  } else {
                     return undefined;
                  }
               })()
            };
         let properties: Global.Types.DeepPartial<typeof defaultProperties> = (raw.properties) ?
            {
               name: raw.properties.name,
               breakdownVoltage: raw.properties.breakdownVoltage,
               saturationCurrent: raw.properties.saturationCurrent,
               color: raw.properties.color
            } : {
               breakdownVoltage: raw.breakdownVoltage,
               saturationCurrent: raw.saturationCurrent,
               color: raw.colour
            };

         return makeInstance(properties, state, true);
      }

      export const makeInstance = getMaker(Instance, defaultProperties, defaultState,
         (component: Instance) => {
            $(component.group.element).addClass("component " + component.name);
            Addins.Graphical.init(component);
            Addins.Selectable.init(component);
            Addins.ConnectionHighlights.init(component, false);
            if (Constants.schematicManipulationEnabled) {
               Addins.Draggable.init(component);
               Addins.Extendable.init(component);
            }
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