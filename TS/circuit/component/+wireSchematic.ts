namespace Circuit.Component {

   export namespace WireSchematic {
      export namespace Types {
         export interface properties extends Component.Types.properties { }

         export interface state extends Component.Types.state {
            joints: Vector[];
         }
      }
   }

   namespace Local {
      import Types = WireSchematic.Types;

      export const defaultState: Types.state = {
         joints: [{ x: 0, y: 0 }, { x: 10, y: 10 }]
      }

      export const defaultProperties: Types.properties = {
         name: "wire",
      }

      export class Instance extends Component.Instance implements Types.properties, Types.state {
         joints: Vector[];
         connectorSets: Component.Types.node[][] = [];


         constructor(properties: Types.properties, state: Types.state) {
            super(properties, state);
            $(this.group.element).addClass("component " + this.name);
            this.joints = state.joints;
         }

         getProperties(): Types.properties {
            return {
               name: this.name
            }
         }


         getState(): Types.state {
            return {
               joints: this.joints
            }
         }

         draw() {
            this.group.prepend(Svg.Element.Path.make(this.joints, "line thin"));
         }

         /** Builds and draws the components connectors */
         makeConnectors() {
            let end1 = this.joints[0];
            let end2 = this.joints[this.joints.length - 1];

            this.connectorSets = [
               [Component.Generics.makeConnector(this, "", "node", end1),
               Component.Generics.makeConnector(this, "", "node", end2)]
            ]
         }

         insertInto(element: SVGGraphicsElement) {
            Utility.Insert.first(this.group.element, element);
         }


         transferFunction(from: Component.Types.connector): Component.Types.connector[] {
            return Utility.flatten2d(this.connectorSets.map(connectorSet =>
               connectorSet.filter(connector =>
                  (connector !== from)
               )
            ));
         }
      }

      export const loadInstance: Component.Types.loadFunction = (raw: any): Instance => {
         let state: Global.Types.DeepPartial<typeof defaultState> = (raw.state) ?
            {
               joints: (vector.isVectorArray(raw.state.joints) && raw.state.joints.length > 1)
                  ? vector.standardise(raw.state.joints as AnyVector[])
                  : undefined
            } : {
               joints: (() => {
                  if (vector.isVectorArray(raw.joints) && raw.joints.length > 1) {
                     let baseJoints = vector.standardise(raw.joints as AnyVector[]);
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
            } : {};

         return makeInstance(properties, state, true);
      }

      export const makeInstance = getMaker(Instance, defaultProperties, defaultState,
         (component: Instance) => {
            $(component.group.element).addClass("component " + component.name);
            Addins.Junctions.init(component);
            Addins.Selectable.init(component);
            Addins.Graphical.init(component);
            if (Constants.schematicManipulationEnabled) {
               Addins.Draggable.init(component);
               Addins.Extendable.init(component, true, true);
            }
         }
      );
   }

   export const WireSchematic = {
      defaultState: Local.defaultState,
      defaultProperties: Local.defaultProperties,
      makeInstance: Local.makeInstance,
      loadInstance: Local.loadInstance,
      Instance: Local.Instance
   }
}