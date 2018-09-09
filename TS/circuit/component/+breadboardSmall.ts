namespace Circuit.Component {

   export namespace BreadboardSmall {
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
      import Types = BreadboardSmall.Types;

      export const defaultState: Types.state = {
         joints: [{ x: 0, y: 0 }, { x: 20, y: 0 }],
         disabled: false
      }
      export const defaultProperties: Types.properties = {
         name: "breadboardsmall"
      }

      export class Instance extends Component.Instance implements Types.properties, Types.state {
         tracks: Addins.Board.Track.Instance[] = [];
         connectorSets: Component.Types.hole[][] = [];
         joints: [Vector, Vector];

         constructor(properties: Types.properties, state: Types.state) {
            super(properties, state);
            this.joints = state.joints
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
               Svg.Element.Group.Breadboard.SmallLayout.make(this.joints[0], this.joints[1], "body"),
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
         for (let y of powerTrackYPositions) {

            const start = vector({ x: gS * -14, y: y * gS })
               .rotate(rotation)
               .sumWith(parent.joints[0]);

            const step = vector({ x: gS, y: 0 }).rotate(rotation);

            let track = Addins.Board.Track.makeInstance({
               holeSpacings: [0, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1]
            }, {
                  joints: [start, step]
               });
            tracks.push(track);
         }

         let mainGridTrackXPositions = [...Array(30).keys()];
         let mainGridTrackYPositions = [-5.5, +1.5];

         for (let x of mainGridTrackXPositions) {
            for (let y of mainGridTrackYPositions) {

               const start = vector({ x: (x - 14.5) * gS, y: y * gS })
                  .rotate(rotation)
                  .sumWith(parent.joints[0]);

               const step = vector({ x: 0, y: gS }).rotate(rotation);

               let track = Addins.Board.Track.makeInstance({
                  holeSpacings: [0, 1, 1, 1, 1]
               }, {
                     joints: [start, step]
                  });
               tracks.push(track);
            }
         }

         return tracks;
      }

      export const loadInstance: Component.Types.loadFunction = (raw: any): Instance => {

         let state: Global.Types.DeepPartial<typeof defaultState> = (raw.state) ?
            {
               joints: (vector.isVectorArray(raw.state.joints) && raw.state.joints.length === 2)
                  ? vector.standardise(raw.state.joints as AnyVector[])
                  : undefined
            } : {};

         let properties: Global.Types.DeepPartial<typeof defaultProperties> = (raw.properties) ?
            {} : {};

         return makeInstance(properties, state, true);
      }

      export const makeInstance = getMaker(Instance, defaultProperties, defaultState,
         (component: Instance) => {
            $(component.group.element).addClass("breadboard " + component.name);
            Addins.Graphical.init(component);
            Addins.Board.init(component);
            Addins.Selectable.init(component);
            Addins.WireCreation.init(component);
            Addins.Draggable.init(component);
            Addins.Rotatable.init(component);
         }
      );
   }

   export const BreadboardSmall = {
      defaultState: Local.defaultState,
      defaultProperties: Local.defaultProperties,
      Instance: Local.Instance,
      makeInstance: Local.makeInstance,
      loadInstance: Local.loadInstance
   }
}