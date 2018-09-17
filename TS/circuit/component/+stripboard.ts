namespace Circuit.Component {

   export namespace Stripboard {
      export type Instance = Local.Instance;
      export namespace Types {
         export interface trackBreak { track: number, hole: number }

         export interface properties extends Component.Types.properties {
            rows: number;
            columns: number;
         }
         export interface state extends Component.Types.state {
            joints: [Vector, Vector];
            trackBreaks: trackBreak[];
         }

         export interface loadFunction extends Component.Types.loadFunction {
            (raw: any): Instance;
         }

      }
   }

   namespace Local {
      import Types = Stripboard.Types;

      export class Instance extends Component.Instance implements Types.properties, Types.state {
         tracks: Addins.Board.Track.Instance[] = [];
         connectorSets: Component.Types.hole[][] = [];
         trackBreaks: Types.trackBreak[];
         rows: number;
         columns: number;
         joints: [Vector, Vector];

         constructor(values: Types.properties & Types.state) {
            super(values);
            this.rows = values.rows;
            this.columns = values.columns;
            this.trackBreaks = values.trackBreaks;
            this.joints = values.joints;
         }

         getProperties(): Types.properties {
            return Utility.deepCopy({
               name: this.name,
               rows: this.rows,
               columns: this.columns
            });
         }

         getState(): Types.state {
            return Utility.deepCopy({
               joints: this.joints,
               disabled: this.disabled,
               trackBreaks: this.trackBreaks
            });
         }

         makeConnectors() {
            this.tracks.forEach(track => track.makeConnectors());
            this.tracks.forEach((track, trackIdx) => {
               let trackBreaks = this.trackBreaks.filter(trackBreak => trackBreak.track === trackIdx);
               track.connectorSets[0].forEach((hole, holeIdx) => {
                  if (trackBreaks.some(trackBreak => trackBreak.hole === holeIdx)) {
                     hole.type = "brokenhole";
                  }
               });
            })
         }

         draw() {

            let rotation = vector(this.joints[0]).getAngleTo(this.joints[1]);
            this.tracks = makeTracks(this)


            const gS = Constants.gridSpacing;
            //const centre = { x: (this.columns - 1) * gS / 2, y: (this.rows - 1) * gS / 2 };
            const size = { width: (this.columns + 0.5) * gS, height: (this.rows + 0.5) * gS };
            const cornerRounding = { x: 3, y: 3 };

            this.group.append(
               Svg.Element.Rect.make(vector(0), size, cornerRounding, "body highlight").translate(this.joints[0]).rotate(rotation),
               this.tracks.map(t => t.group)
            );

         }

         insertInto(element: SVGGraphicsElement) {
            Utility.Insert.first(this.group.element, element);
         }

         transferFunction() { return [] };
      }

      const makeTracks = (parent: Instance): Addins.Board.Track.Instance[] => {
         let gS = Constants.gridSpacing;

         let rotation = vector(parent.joints[0]).getAngleTo(parent.joints[1]);

         let start = vector({
            x: -((parent.columns - 1) * gS / 2),
            y: -((parent.rows - 1) * gS / 2)
         }).rotate(rotation).sumWith(parent.joints[0]);


         let step = vector({ x: gS, y: 0 }).rotate(rotation);


         let tracks: Addins.Board.Track.Instance[] = [];

         for (let row = 0; row < parent.rows; row++) {

            let rowStart = start.sumWith(
               vector({ x: 0, y: row * gS }).rotate(rotation)).vector;


            let holeSpacings: number[] = [0].concat(Array(parent.columns - 1).fill(1));
            let track = Addins.Board.Track.makeInstance({
               holeSpacings: holeSpacings,
               style: "stripboard",
               joints: [rowStart, step]
            }, false);
            //track.group.translate({ x: 0, y: row * gS }).rotate(0);
            tracks.push(track);
         }

         return tracks;
      }

      export const defaults: Types.state & Types.properties = {
         joints: [{ x: 0, y: 0 }, { x: 20, y: 0 }],
         disabled: false,
         trackBreaks: [],
         name: "stripboard",
         rows: 1,
         columns: 1
      }

      export const defaulter: ValueCheck.Defaulter<Types.state & Types.properties> = {
         name: ValueCheck.validate("string", "stripboard"),
         disabled: ValueCheck.validate("boolean", false),
         joints: ValueCheck.joints<[Vector, Vector]>(
            [{ x: 0, y: 0 }, { x: 20, y: 0 }]
         ),
         rows: ValueCheck.integer(1),
         columns: ValueCheck.integer(1),
         trackBreaks: validateTrackBreaks([]),
      };

      export function validateTrackBreaks<T extends Types.trackBreak[]>(fallback: T): ValueCheck.validater<T> {
         const result = (value: unknown, log: boolean = true) => {
            const predicate = (v: unknown) => ((value && Array.isArray(value) && value.every((tB: Types.trackBreak) => {
               return (('track' in tB) && ('hole' in tB) && (typeof tB.track === 'number') && (typeof tB.hole === 'number'));
            })));

            return ValueCheck.validate<T>(predicate, fallback)(value);
         }

         return result;
      }

      export const loadInstance: Component.Types.loadFunction = (raw: any): Instance => {
         const name = (raw.name);
         const rows = (raw.rows);
         const columns = (raw.columns);
         const trackBreaks = (raw.trackBreaks);
         const joints = (raw.joints);

         return makeInstance({ name, rows, columns, trackBreaks, joints }, true);
      }

      export const makeInstance = getMaker(Instance, defaulter,
         (component: Instance) => {
            $(component.group.element).addClass(component.name);
            Addins.Graphical.init(component);
            Addins.Board.init(component, true);
            Addins.Selectable.init(component);
            Addins.WireCreation.init(component);
            Addins.Draggable.init(component);
            Addins.Rotatable.init(component);
         }
      );
   }

   export const Stripboard = {

      Instance: Local.Instance,
      makeInstance: Local.makeInstance,
      loadInstance: Local.loadInstance
   }
}
