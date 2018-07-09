namespace Circuit.Component {
   namespace WireLayout {
      export type Instance = Local.Instance;
      export namespace Types {
         export type properties = Component.Types.properties;

         export interface state extends Component.Types.state {
            joints: Global.Types.vector[];
            color: string;
         }

         export interface loadFunction extends Component.Types.loadFunction {
            (raw: any): Instance;
         }

         export type Instance = Local.Instance;
      }
   }

   namespace Local {
      import Types = WireLayout.Types;

      export const defaultState: Types.state = {
         location: { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 },
         joints: [{ X: 0, Y: 0 }, { X: 80, Y: 0 }],
         color: "#545454"
      }

      export const defaultProperties: Types.properties = {
         name: "wire",
      }

      export class Instance extends Component.Instance implements Types.properties, Types.state {
         joints: Global.Types.vector[];
         color: string;

         constructor(properties: Types.properties, state: Types.state) {
            super(properties, state);
            this.group.addClasses("component " + this.name);
            this.joints = state.joints;
            this.color = state.color;
            Addins.Draggable.init(this);
            Addins.Selectable.init(this);
            Addins.Extendable.init(this, true, true, true);
            Addins.ConnectionHighlights.init(this);
            Addins.Recolorable.init(this, () => getRecolorPosition(this), ".cover")
         }

         getProperties(): Types.properties {
            return {
               name: this.name
            }
         }

         getState(): Types.state {
            return {
               location: this.group.transforms,
               joints: this.joints,
               color: this.color
            }
         }

         draw() {
            let coverPath, leadPath: string = "";

            //The proportion of half the end joints that is cover not lead
            let coverRatio = 0.6; //BETWEEN 0 and 1

            // Just for ease
            let joints = this.joints //this.handles.map(h => h.position);

            //Start at the beginning
            coverPath = leadPath = "M " + joints[0].X + " " + this.joints[0].Y;

            // Draw cover towards the midpoint of first two joints (starting from coverRatio)
            coverPath += getSegmentTowardsJointMid(joints[0], joints[1], -coverRatio);
            // Draw lead path from start to midpoint of the first two joints
            leadPath += getSegmentTowardsJointMid(joints[0], joints[1], 1);

            // Draw curve between all mid joints
            let pathMid = getBezierBetweenJoints(joints);
            coverPath += pathMid;
            leadPath += pathMid;

            // Draw cover away from the midpoint of the last two joints (starting from 1-coverRatio)
            coverPath += getSegmentTowardsJointMid(joints[joints.length - 2], joints[joints.length - 1], coverRatio)
            // Draw lead path to end
            leadPath += getSegmentTowardsJointMid(joints[joints.length - 2], joints[joints.length - 1], 1)

            let cover = new Svg.Elements.Graphics.Simples.Path(coverPath, "cover");

            //Style and add lead, cover
            //(Prepend so handles appear on top)
            this.group.prepend([
               new Svg.Elements.Graphics.Simples.Path(leadPath, "lead"),
               new Svg.Elements.Graphics.Simples.Path(coverPath, "leadhighlight highlight"),
               cover,
            ]);

            $(cover.element).css("stroke", this.color);
         }

         /** Builds the components connectors */
         makeConnectors() {
            this.connectorSets = [
               [Component.Generics.makeConnector(this, "", "pin", this.joints[0]),
               Component.Generics.makeConnector(this, "", "pin", this.joints[this.joints.length - 1]),]
            ]
         }

         transferFunction(from?: Component.Types.connector): Component.Types.connector[] {
            return Utility.flatten2d(this.connectorSets.map(connectorSet => connectorSet.filter(connector => connector !== from)));
         }
      }

      export const loadInstance: Component.Types.loadFunction = (raw: any): Instance => {
         let state: Global.Types.DeepPartial<typeof defaultState> = (raw.state) ?
            {
               location: raw.state.location,
               joints: (raw.state.joints && (raw.state.joints.length > 1) && (raw.state.joints.every((j: Global.Types.vector) => {
                  return (('X' in j) && ('Y' in j) && (typeof j.X === 'number') && (typeof j.Y === 'number'));
               }))) ? raw.state.joints : undefined,
               color: raw.state.color
            } : {};
         let properties: Global.Types.DeepPartial<typeof defaultProperties> = (raw.properties) ?
            {
               name: raw.properties.name,
            } : {};

         return makeInstance(properties, state, true);
      }

      function getBezierBetweenJoints(joints: Global.Types.vector[]): string {
         //Assume we are starting at the midpoint between first two joints
         let path: string = "";

         for (let j = 1; j < joints.length - 1; j++) {

            // End each curve at the mid point between the last two joints
            let p3 = {
               X: (joints[j + 1].X + joints[j].X) / 2,
               Y: (joints[j + 1].Y + joints[j].Y) / 2
            }

            path += "Q " + joints[j].X + " " + joints[j].Y +
               " " + p3.X + " " + p3.Y;
         }

         return path;
      }

      // Starting or ending at a midpoint
      function getSegmentTowardsJointMid(j0: Global.Types.vector, j1: Global.Types.vector, ratio: number): string {
         let changeMid = {
            X: (j1.X - j0.X) / 2,
            Y: (j1.Y - j0.Y) / 2
         }

         if (Math.sign(ratio) >= 0) {
            return 'l' + (changeMid.X * ratio) + " " + (changeMid.Y * ratio) +
               'm' + (changeMid.X * (1 - ratio)) + " " + (changeMid.Y * (1 - ratio));
         } else {
            ratio = Math.abs(ratio);
            return 'm' + (changeMid.X * (1 - ratio)) + " " + (changeMid.Y * (1 - ratio)) +
               'l' + (changeMid.X * ratio) + " " + (changeMid.Y * ratio);
         }
      }

      function getRecolorPosition(component: Instance): Global.Types.vector {
         const angle = Utility.angleBetween(component.joints[0], component.joints[1]) - Math.PI / 4;
         const offset = Utility.polarToCartesian(12, angle);
         return {
            X: component.joints[0].X + offset.X,
            Y: component.joints[0].Y + offset.Y
         };
      }

      export const makeInstance = Generics.getMaker(Instance, defaultProperties, defaultState,
         (component: Instance) => {
            component.group.addClasses("component " + component.name);
            Addins.Draggable.init(component);
            Addins.Selectable.init(component);
            Addins.Extendable.init(component, true, true, true);
            Addins.ConnectionHighlights.init(component);
            Addins.Recolorable.init(component, () => getRecolorPosition(component), ".cover");
         }
      );
   }

   export const WireLayout = {
      defaultState: Local.defaultState,
      defaultProperties: Local.defaultProperties,
      Instance: Local.Instance,
      makeInstance: Local.makeInstance,
      loadInstance: Local.loadInstance
   }
}
