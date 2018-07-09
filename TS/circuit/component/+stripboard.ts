namespace Circuit.Component {

   export namespace Stripboard {
      export type Instance = Local.Instance;
      export namespace Types {
         export interface trackBreak { track: number, hole: number }

         export interface properties extends Component.Types.properties {
            rows: number;
            columns: number;
            trackBreaks: trackBreak[];
         }
         export interface state extends Component.Types.state { }

         export interface loadFunction extends Component.Types.loadFunction {
            (raw: any): Instance;
         }

      }
   }

   namespace Local {
      import Types = Stripboard.Types;

      export const defaultState: Types.state = {
         location: { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 },
      }
      export const defaultProperties: Types.properties = {
         name: "stripboard",
         rows: 1,
         columns: 1,
         trackBreaks: []
      }

      export class Instance extends Component.Instance implements Types.properties, Types.state {
         tracks: Addins.Board.Track.Instance[] = [];
         connectorSets: Component.Types.hole[][] = [];
         trackBreaks: Types.trackBreak[];
         rows: number;
         columns: number;

         constructor(properties: Types.properties, state: Types.state) {
            super(properties, state);
            this.rows = properties.rows;
            this.columns = properties.columns;
            this.trackBreaks = properties.trackBreaks;
         }

         getProperties(): Types.properties {
            return {
               name: this.name,
               rows: this.rows,
               columns: this.columns,
               trackBreaks: this.trackBreaks
            }
         }

         getState(): Types.state {
            return {
               location: this.group.transforms
            }
         }

         makeConnectors() { }

         draw() {
            const gS = Constants.gridSpacing;
            const centre = { X: (this.columns - 1) * gS / 2, Y: (this.rows - 1) * gS / 2 };
            const size = { width: (this.columns + 0.5) * gS, height: (this.rows + 0.5) * gS };
            const cornerRounding = { X: 3, Y: 3 };
            this.group.append(new Svg.Elements.Graphics.Simples.Rect(
               centre, size, cornerRounding, "body highlight"
            ));

            this.tracks.map(track => {
               this.group.append(track.group);
               track.draw("stripboard");
            });
         }

         insertInto(group: Svg.Elements.Group) {
            Svg.Utility.Insert.first(this.group.element, group.element);
         }
      }

      const makeTracks = (parent: Instance): Addins.Board.Track.Instance[] => {
         let tracks: Addins.Board.Track.Instance[] = [];
         let gS = Constants.gridSpacing;

         for (let row = 0; row < parent.rows; row++) {
            let holeSpacings: number[] = [0].concat(Array(parent.columns - 1).fill(gS));
            let track = Addins.Board.Track.makeInstance({
               holeSpacings: holeSpacings
            }, {});
            track.group.translate({ X: 0, Y: row * gS }).rotate(0);
            tracks.push(track);
         }

         return tracks;
      }

      export const loadInstance: Component.Types.loadFunction = (raw: any): Instance => {
         // Set default state
         let state = Object.assign({}, defaultState);
         // Set default properties
         let properties = Object.assign({}, defaultProperties);

         // If from a layout
         if (raw.state) {
            if (raw.state.location) {
               state.location = raw.state.location;
            }
         }

         if (raw.properties) {
            properties.rows = raw.properties.rows || 0;
            properties.columns = raw.properties.columns || 0;
            if (raw.properties.trackBreaks) {
               if ((raw.properties.trackBreaks.every((tB: Types.trackBreak) => {
                  return (('track' in tB) && ('hole' in tB) && (typeof tB.track === 'number') && (typeof tB.hole === 'number'));
               }))) {
                  properties.trackBreaks = raw.properties.trackBreaks;
               }
            }
         }
         return makeInstance(properties, state, true);
      }

      export const makeInstance = Generics.getMaker(Instance, defaultProperties, defaultState,
         (component: Instance) => {
            component.group.addClasses(component.name);
            Addins.Board.init(component, makeTracks, true);
            Addins.Selectable.init(component);
            Addins.WireCreation.init(component);
         }
      );
   }

   export const Stripboard = {
      defaultState: Local.defaultState,
      defaultProperties: Local.defaultProperties,
      Instance: Local.Instance,
      makeInstance: Local.makeInstance,
      loadInstance: Local.loadInstance
   }
}