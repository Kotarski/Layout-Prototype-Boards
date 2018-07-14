namespace Circuit.Component {

   export namespace WireSchematic {
      export namespace Types {
         export interface properties extends Component.Types.properties { }

         export interface state extends Component.Types.state {
            joints: Global.Types.vector[];
         }
      }
   }

   namespace Local {
      import Types = WireSchematic.Types;

      export const defaultState: Types.state = {
         location: { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 },
         joints: [{ X: 0, Y: 0 }, { X: 10, Y: 10 }]
      }

      export const defaultProperties: Types.properties = {
         name: "wire",
      }

      export class Instance extends Component.Instance implements Types.properties, Types.state {
         joints: Global.Types.vector[];
         connectorSets: Component.Types.node[][] = [];


         constructor(properties: Types.properties, state: Types.state) {
            super(properties, state);
            this.group.addClasses("component " + this.name);
            this.joints = state.joints;
         }

         getProperties(): Types.properties {
            return {
               name: this.name
            }
         }


         getState(): Types.state {
            return {
               location: this.group.transforms,
               joints: this.joints
            }
         }

         draw() {
            let pathString = "M " + this.joints[0].X + " " + this.joints[0].Y;
            for (let j = 1; j < this.joints.length; j++) {
               pathString += " L " + this.joints[j].X + " " + +this.joints[j].Y;
            }
            this.group.append(new Svg.Elements.Path(pathString, "line thin"));
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

         insertInto(group: Svg.Elements.Group) {
            Utility.Insert.first(this.group.element, group.element);
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
               location: raw.state.location,
               joints: (raw.state.joints && (raw.state.joints.length > 1) && (raw.state.joints.every((j: Global.Types.vector) => {
                  return (('X' in j) && ('Y' in j) && (typeof j.X === 'number') && (typeof j.Y === 'number'));
               }))) ? raw.state.joints : undefined,
            } : {
               location: (raw.where) ? {
                  e: raw.where.X,
                  f: raw.where.Y
               } : undefined,
               joints: (raw.joints && (raw.joints.length > 1) && (raw.joints.every((j: Global.Types.vector) => {
                  return (('X' in j) && ('Y' in j) && (typeof j.X === 'number') && (typeof j.Y === 'number'));
               }))) ? raw.joints : undefined,
            };
         let properties: Global.Types.DeepPartial<typeof defaultProperties> = (raw.properties) ?
            {
               name: raw.properties.name,
            } : {};

         return makeInstance(properties, state, true);
      }

      export const makeInstance = getMaker(Instance, defaultProperties, defaultState,
         (component: Instance) => {
            component.group.addClasses("component " + component.name);
            Addins.Junctions.init(component);
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