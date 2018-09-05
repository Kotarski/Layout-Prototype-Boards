namespace Circuit.Component {
   namespace WireLayout {
      export type Instance = Local.Instance;
      export namespace Types {
         export type properties = Component.Types.properties;

         export interface state extends Component.Types.state {
            joints: Vector[];
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
         joints: [{ x: 0, y: 0 }, { x: 80, y: 0 }],
         color: "#545454"
      }

      export const defaultProperties: Types.properties = {
         name: "wire",
      }

      export class Instance extends Component.Instance implements Types.properties, Types.state {
         joints: Vector[];
         color: string;

         constructor(properties: Types.properties, state: Types.state) {
            super(properties, state);
            $(this.group.element).addClass("component " + this.name);
            this.joints = state.joints;
            this.color = state.color;
         }

         getProperties(): Types.properties {
            return {
               name: this.name
            }
         }

         getState(): Types.state {
            return {
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
            coverPath = leadPath = "M " + joints[0].x + " " + this.joints[0].y;

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

            let cover = Svg.Element.Path.make(coverPath, "cover");

            //Style and add lead, cover
            //(Prepend so handles appear on top)
            this.group.prepend([
               Svg.Element.Path.make(leadPath, "lead"),
               Svg.Element.Path.make(coverPath, "leadhighlight highlight"),
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

         transferFunction(from: Component.Types.connector): Component.Types.connector[] {
            return Utility.flatten2d(this.connectorSets.map(connectorSet => connectorSet.filter(connector => connector !== from)));
         }
      }

      export const loadInstance: Component.Types.loadFunction = (raw: any): Instance => {
         let state: Global.Types.DeepPartial<typeof defaultState> = (raw.state) ?
            {
               joints: (vector.isVectorArray(raw.state.joints) && raw.state.joints.length > 1)
                  ? vector.standardise(raw.state.joints as AnyVector[])
                  : undefined,
               color: raw.state.color
            } : {};
         let properties: Global.Types.DeepPartial<typeof defaultProperties> = (raw.properties) ?
            {
               name: raw.properties.name,
            } : {};

         return makeInstance(properties, state, true);
      }

      function getBezierBetweenJoints(joints: Vector[]): string {
         //Assume we are starting at the midpoint between first two joints
         let path: string = "";

         for (let j = 1; j < joints.length - 1; j++) {

            // End each curve at the mid point between the last two joints
            let p3 = {
               x: (joints[j + 1].x + joints[j].x) / 2,
               y: (joints[j + 1].y + joints[j].y) / 2
            }

            path += "Q " + joints[j].x + " " + joints[j].y +
               " " + p3.x + " " + p3.y;
         }

         return path;
      }

      // Starting or ending at a midpoint
      function getSegmentTowardsJointMid(j0: Vector, j1: Vector, ratio: number): string {
         let changeMid = {
            x: (j1.x - j0.x) / 2,
            y: (j1.y - j0.y) / 2
         }

         if (Math.sign(ratio) >= 0) {
            return 'l' + (changeMid.x * ratio) + " " + (changeMid.y * ratio) +
               'm' + (changeMid.x * (1 - ratio)) + " " + (changeMid.y * (1 - ratio));
         } else {
            ratio = Math.abs(ratio);
            return 'm' + (changeMid.x * (1 - ratio)) + " " + (changeMid.y * (1 - ratio)) +
               'l' + (changeMid.x * ratio) + " " + (changeMid.y * ratio);
         }
      }

      function getRecolorPosition(component: Instance): Vector {
         const angle = vector(component.joints[0]).getAngleTo(component.joints[1]);
         const offset = Utility.Polar.toVector(12, angle + 45);
         return vector(component.joints[0]).sumWith(offset).vector;
      }

      export const makeInstance = getMaker(Instance, defaultProperties, defaultState,
         (component: Instance) => {
            $(component.group.element).addClass("component " + component.name);
            Addins.Graphical.init(component); Addins.Draggable.init(component);
            Addins.Selectable.init(component);
            Addins.Extendable.init(component, true, true, true);
            Addins.ConnectionHighlights.init(component);
            Addins.Recolorable.init(component, () => getRecolorPosition(component));
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
