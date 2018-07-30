namespace Circuit.Component {

   export namespace BreadboardSmall {
      export type Instance = Local.Instance;
      export namespace Types {
         export type properties = Component.Types.properties;

         export interface state extends Component.Types.state { }

         export interface loadFunction extends Component.Types.loadFunction {
            (raw: any): Instance;
         }
      }
   }

   namespace Local {
      import Types = BreadboardSmall.Types;

      export const defaultState: Types.state = {
         location: { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 },
      }
      export const defaultProperties: Types.properties = {
         name: "breadboardsmall"
      }

      export class Instance extends Component.Instance implements Types.properties, Types.state {
         tracks: Addins.Board.Track.Instance[] = [];
         connectorSets: Component.Types.hole[][] = [];

         constructor(properties: Types.properties, state: Types.state) {
            super(properties, state);
         }

         getProperties(): Types.properties {
            return {
               name: this.name,
            }
         }

         getState(): Types.state {
            return {
               location: this.location
            }
         }

         makeConnectors() { }

         draw() {
            const gS = Constants.gridSpacing;

            // Power Rails strings:
            const railPairPathString = [
               "M" + (gS * 1.3) + " " + (0),
               "H" + (gS * 29.7),
               "M" + (gS * 1.3) + " " + (gS * 18),
               "H" + (gS * 29.7)
            ].join();

            const plussesPathString = [
               "M" + (gS * 0.5 - 5) + " " + (gS * 0.5),
               "h" + (10),
               "m" + (gS * 30 - 10) + " " + (0),
               "h" + (10),
               "m" + (-5) + " " + (-5),
               "v" + (10),
               "m" + (0) + " " + (gS * 18 - 10),
               "v" + (10),
               "m" + (5) + " " + (-5),
               "h" + (-10),
               "m" + (gS * -30 + 10) + " " + (0),
               "h" + (-10),
               "m" + (5) + " " + (5),
               "v" + (-10),
               "m" + (0) + " " + (gS * -18 + 10),
               "v" + (-10)
            ].join();

            const minusesPathString = [
               "M " + (gS * 0.5) + " " + (gS * -0.5 - 5),
               "v" + (10),
               "m" + (0) + " " + (gS * 18 - 10),
               "v" + (10),
               "m" + (gS * 30) + " " + (0),
               "v" + (-10),
               "m" + (0) + " " + (gS * -18 + 10),
               "v" + (-10)
            ].join();

            const size = {
               width: 32 * gS,
               height: 22 * gS
            };
            const centre = {
               x: 15.5 * gS,
               y: 10.5 * gS
            };

            this.group.append(
               //Body
               Svg.Element.Rect.make(centre, size, { x: 4, y: 4 }, "body"),
               //Centre rut
               Svg.Element.Rect.make(centre, { width: size.width, height: gS * 0.75, }, { x: 0, y: 0 }, "rut"),
               //Body Highlights
               Svg.Element.Rect.make(centre, size, { x: 4, y: 4 }, "body highlight"),
               //Power rail positives
               Svg.Element.Path.make(railPairPathString + plussesPathString, "rail positive"),
               //Power rail negatives
               Svg.Element.Path.make(railPairPathString + minusesPathString, "rail negative").translate({ x: 0, y: gS * 3 }),
               //Text Left (portrait)
               Svg.Element.Group.TextSequence.make({ x: 30 * gS - gS / 6, y: 4 * gS }, { x: 0, y: gS }, { start: 1, length: 30 }).rotate(90),
               //Text Right (portrait)
               Svg.Element.Group.TextSequence.make({ x: 30 * gS - gS / 6, y: 17 * gS }, { x: 0, y: gS }, { start: 1, length: 30 }).rotate(90),
               //Text Top Left (portrait)
               Svg.Element.Group.TextSequence.make({ x: 31 * gS - gS / 4, y: 5 * gS }, { x: gS, y: 0 }, "abcde").rotate(90),
               //Text Bottom Left (portrait)
               Svg.Element.Group.TextSequence.make({ x: 0 * gS, y: 5 * gS }, { x: gS, y: 0 }, "abcde").rotate(90),
               //Text Top Right (portrait)
               Svg.Element.Group.TextSequence.make({ x: 31 * gS - gS / 4, y: 12 * gS }, { x: gS, y: 0 }, "fghij").rotate(90),
               //Text Bottom Right (portrait)
               Svg.Element.Group.TextSequence.make({ x: 0 * gS, y: 12 * gS }, { x: gS, y: 0 }, "fghij").rotate(90),
               //Tracks
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

         let powerTrackYPositions = [1, 2, 19, 20].map(y => y * gS);
         for (let y of powerTrackYPositions) {
            let track = Addins.Board.Track.makeInstance({
               holeSpacings: [0, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1].map(offset => offset * gS)
            }, {});
            track.group.translate({ x: gS * 1.5, y: y }).rotate(0);
            tracks.push(track);
         }

         let mainGridTrackXPositions = [...Array(30).keys()].map(x => (x + 1) * gS);
         let mainGridTrackYPositions = [5, 12].map(y => y * gS);

         for (let x of mainGridTrackXPositions) {
            for (let y of mainGridTrackYPositions) {
               let track = Addins.Board.Track.makeInstance({
                  holeSpacings: [0, 1, 1, 1, 1].map(offset => offset * gS)
               }, {});
               track.group.translate({ x: x, y: y }).rotate(90);
               tracks.push(track);
            }
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
         return makeInstance(properties, state, true);
      }

      export const makeInstance = getMaker(Instance, defaultProperties, defaultState,
         (component: Instance) => {
            $(component.group.element).addClass("breadboard " + component.name);
            Addins.Board.init(component, makeTracks);
            Addins.Selectable.init(component);
            Addins.WireCreation.init(component);
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