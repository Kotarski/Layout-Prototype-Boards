namespace Circuit.Component {

   export namespace BreadboardLarge {
      export type Instance = Local.Instance;
      export namespace Types {
         export type properties = Component.Types.properties;

         export interface state extends Component.Types.state {
            joints: [Vector, Vector];
         }

         export interface loadFunction extends Component.Types.loadFunction {
            (raw: any): Instance;
         }
      }
   }

   namespace Local {
      import Types = BreadboardLarge.Types;

      export class Instance extends Component.Instance implements Component.Instance, Types.properties, Types.state {
         tracks: Addins.Board.Track.Instance[] = [];
         connectorSets: Component.Types.hole[][] = [];
         joints: [Vector, Vector];

         constructor(values: Types.properties & Types.state) {
            super(values);
            this.joints = values.joints
         }

         getProperties(): Types.properties {
            return Utility.deepCopy({
               name: this.name,
            });
         }

         getState(): Types.state {
            return Utility.deepCopy({
               joints: this.joints,
               disabled: this.disabled
            });
         }

         makeConnectors() { }

         draw() {
            this.tracks = makeTracks(this)

            this.group.prepend(
               Svg.Element.Group.Breadboard.LargeLayout.make(this.joints[0], this.joints[1], "body"),
               this.tracks.map(t => t.group)
            )
         }

         insertInto(element: SVGGraphicsElement) {
            Utility.Insert.first(this.group.element, element);
         }

         transferFunction() { return [] };

      }

      const makeTracks: (parent: Instance) => Addins.Board.Track.Instance[] = (parent: Instance) => {
         let tracks: Addins.Board.Track.Instance[] = [];

         let gS = Constants.gridSpacing;

         let rotation = vector(parent.joints[0]).getAngleTo(parent.joints[1]);


         let powerTrackYPositions = [-9.5, -8.5, 8.5, 9.5];
         let powerTrackXPositions = [-29.5, 1.5];
         for (let x of powerTrackXPositions) {
            for (let y of powerTrackYPositions) {

               const start = vector({ x: x * gS, y: y * gS })
                  .rotate(rotation)
                  .sumWith(parent.joints[0]);

               const step = vector({ x: gS, y: 0 }).rotate(rotation);

               let track = Addins.Board.Track.makeInstance({
                  holeSpacings: [0, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1],
                  joints: [start, step]
               }, false);
               tracks.push(track);
            }
         }

         let mainGridTrackXPositions = [...Array(64).keys()];
         let mainGridTrackYPositions = [-5.5, +1.5];

         for (let x of mainGridTrackXPositions) {
            for (let y of mainGridTrackYPositions) {

               const start = vector({ x: (x - 31.5) * gS, y: y * gS })
                  .rotate(rotation)
                  .sumWith(parent.joints[0]);

               const step = vector({ x: 0, y: gS }).rotate(rotation);

               let track = Addins.Board.Track.makeInstance({
                  holeSpacings: [0, 1, 1, 1, 1],
                  joints: [start, step]
               }, false);
               tracks.push(track);
            }
         }

         return tracks;
      }

      export const defaults: Types.state & Types.properties = {
         joints: [{ x: 0, y: 0 }, { x: 20, y: 0 }],
         disabled: false,
         name: "breadboardlarge"
      }

      export const defaulter: ValueCheck.Defaulter<Types.state & Types.properties> = {
         name: ValueCheck.validate("string", "breadboardlarge"),
         disabled: ValueCheck.validate("boolean", false),
         joints: ValueCheck.joints<[Vector, Vector]>(
            [{ x: 0, y: 0 }, { x: 20, y: 0 }]
         ),
      };

      export const loadInstance: Component.Types.loadFunction = (raw: any): Instance => {
         const name = (raw.name);
         const joints = (raw.joints);

         return makeInstance({ name, joints }, true);
      }


      export const makeInstance = getMaker(Instance, defaulter,
         (component: Instance) => {
            $(component.group.element).addClass("breadboard " + component.name);
            Addins.Graphical.init(component);
            Addins.Board.init(component);
            Addins.Selectable.init(component);
            Addins.WireCreation.init(component);
            Addins.Draggable.init(component);
         }
      );
   }

   export const BreadboardLarge = {

      Instance: Local.Instance,
      loadInstance: Local.loadInstance,
      makeInstance: Local.makeInstance
   }
}