namespace Circuit.Component {

   export namespace BreadboardLarge {
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
      import Types = BreadboardLarge.Types;

      export const defaultState: Types.state = {
         location: { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 },
      }
      export const defaultProperties: Types.properties = {
         name: "breadboardlarge"
      }

      export class Instance extends Component.Instance implements Component.Instance, Types.properties, Types.state {
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
               location: this.group.transforms
            }
         }

         makeConnectors() { }

         draw() {
            const gS = Constants.gridSpacing;

            // The path of a pair of lines indicating the power rails
            const railPairPathString = [
               "M" + gS * (2.8) + " " + (0),
               "h" + gS * (28.4),
               "M" + gS * (2.8) + " " + (gS * 18),
               "h" + gS * (28.4),
               "M" + gS * (33.8) + " " + (0),
               "h" + gS * (28.4),
               "M" + gS * (33.8) + " " + (gS * 18),
               "h" + gS * (28.4)
            ].join();

            // The path of the little positive power rail plusses
            const plussesPathString = [
               "M" + (gS * 2 - 5) + " " + (gS * 0.5),
               "h" + (10),
               "m" + (gS * 61 - 10) + " " + (0),
               "h" + (10),
               "m" + (-5) + " " + (-5),
               "v" + (10),
               "m" + (0) + " " + (gS * 18 - 10),
               "v" + (10),
               "m" + (5) + " " + (-5),
               "h" + (-10),
               "m" + (gS * -61 + 10) + " " + (0),
               "h" + (-10),
               "m" + (5) + " " + (5),
               "v" + (-10),
               "m" + (0) + " " + (gS * -18 + 10),
               "v" + (-10)
            ].join();

            // The path of the little negative power rail plusses
            const minusesPathString = [
               "M" + (gS * 2) + " " + (gS * -0.5 - 5),
               "v" + (10),
               "m" + (0) + " " + (gS * 18 - 10),
               "v" + (10),
               "m" + (gS * 61) + " " + (0),
               "v" + (-10),
               "m" + (0) + " " + (gS * -18 + 10),
               "v" + (-10)
            ].join();

            const size = {
               width: 67 * gS,
               height: 22 * gS
            };
            const centre = {
               X: 32.5 * gS,
               Y: 10.5 * gS
            };

            this.group.append([
               //body
               new Svg.Elements.Graphics.Simples.Rect(centre, size, { X: 4, Y: 4 }, "body"),
               //Centre rut
               new Svg.Elements.Graphics.Simples.Rect(centre, { width: size.width, height: gS * 0.75, }, { X: 0, Y: 0 }, "rut"),
               //Body Highlights
               new Svg.Elements.Graphics.Simples.Rect(centre, size, { X: 4, Y: 4 }, "body highlight"),
               //Power rail positives
               new Svg.Elements.Graphics.Simples.Path(railPairPathString + plussesPathString, "rail positive"),
               //Power rail negatives
               new Svg.Elements.Graphics.Simples.Path(railPairPathString + minusesPathString, "rail negative").translate({ X: 0, Y: gS * 3 }),
               //Text Left (portrait)
               new Svg.Elements.Graphics.Complexes.TextSequence({ X: 64 * gS - gS / 6, Y: 4 * gS }, { X: 0, Y: gS }, { start: 1, length: 64 }).rotate(90),
               //Text Right (portrait)
               new Svg.Elements.Graphics.Complexes.TextSequence({ X: 64 * gS - gS / 6, Y: 17 * gS }, { X: 0, Y: gS }, { start: 1, length: 64 }).rotate(90),
               //Text Top Left (portrait)
               new Svg.Elements.Graphics.Complexes.TextSequence({ X: 65 * gS - gS / 4, Y: 5 * gS }, { X: gS, Y: 0 }, "abcde").rotate(90),
               //Text Bottom Left (portrait)
               new Svg.Elements.Graphics.Complexes.TextSequence({ X: 0 * gS, Y: 5 * gS }, { X: gS, Y: 0 }, "abcde").rotate(90),
               //Text Top Right (portrait)
               new Svg.Elements.Graphics.Complexes.TextSequence({ X: 65 * gS - gS / 4, Y: 12 * gS }, { X: gS, Y: 0 }, "fghij").rotate(90),
               //Text Bottom Right (portrait)
               new Svg.Elements.Graphics.Complexes.TextSequence({ X: 0 * gS, Y: 12 * gS }, { X: gS, Y: 0 }, "fghij").rotate(90),
            ]);

            this.tracks.map(track => {
               this.group.append(track.group);
               track.draw();
            });
         }

         insertInto(group: Svg.Elements.Group) {
            Utility.Insert.first(this.group.element, group.element);
         }

      }

      const makeTracks: (parent: Instance) => Addins.Board.Track.Instance[] = (parent: Instance) => {
         let tracks: Addins.Board.Track.Instance[] = [];
         let gS = Constants.gridSpacing;

         let powerTrackYPositions = [1, 2, 19, 20].map(y => y * gS);
         let powerTrackXPositions = [3, 34].map(x => x * gS);
         for (let x of powerTrackXPositions) {
            for (let y of powerTrackYPositions) {
               let track = Addins.Board.Track.makeInstance({
                  holeSpacings: [0, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1].map(offset => offset * gS)
               }, {});
               track.group.translate({ X: x, Y: y }).rotate(0);
               tracks.push(track);
            }
         }

         let mainGridTrackXPositions = [...Array(64).keys()].map(x => (x + 1) * gS);
         let mainGridTrackYPositions = [5, 12].map(y => y * gS);

         for (let x of mainGridTrackXPositions) {
            for (let y of mainGridTrackYPositions) {
               let track = Addins.Board.Track.makeInstance({
                  holeSpacings: [0, 1, 1, 1, 1].map(offset => offset * gS)
               }, {});
               track.group.translate({ X: x, Y: y }).rotate(90);
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


      export const makeInstance = Generics.getMaker(Instance, defaultProperties, defaultState,
         (component: Instance) => {
            component.group.addClasses("breadboard " + component.name);
            Addins.Board.init(component, makeTracks);
            Addins.Selectable.init(component);
            Addins.WireCreation.init(component);
         }
      );
   }

   export const BreadboardLarge = {
      defaultState: Local.defaultState,
      defaultProperties: Local.defaultProperties,
      Instance: Local.Instance,
      loadInstance: Local.loadInstance,
      makeInstance: Local.makeInstance
   }
}