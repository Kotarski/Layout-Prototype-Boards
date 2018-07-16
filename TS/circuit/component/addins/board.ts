namespace Circuit.Component.Addins.Board {
   type board = Component.Instance & {
      connectorSets: Component.Types.hole[][],
      tracks: Track.Instance[]
   }
   export interface reversibleBoard extends board {
      trackBreaks: { track: number, hole: number }[];
   }

   export function init<B extends board>(component: B, trackMaker: (component: B) => Track.Instance[]): void
   export function init<B extends reversibleBoard>(component: B, trackMaker: (component: B) => Track.Instance[], isReversible: boolean): void
   export function init<B extends board | reversibleBoard>(component: B, trackMaker: (component: B) => Track.Instance[], isReversible?: boolean): void {
      component.group.addClasses("board");

      component.tracks = trackMaker(component);
      component.tracks.forEach(track => track.makeConnectors());

      Object.defineProperty(component, 'connectorSets', {
         get: () => Utility.flatten2d(component.tracks.map(track => track.connectorSets))
      });

      if (isReversible) {
         Reversible.init(component as reversibleBoard);
      }
   }

   export namespace Track {
      export type Instance = Local.Instance;
      export namespace Types {
         export interface properties extends Component.Types.properties {
            holeSpacings: number[];
            style: "breadboard" | "stripboard";
         }

         export interface state {
            location: Svg.Types.transformMatrix;
         }
      }
   }

   namespace Local {
      import Types = Track.Types

      export const defaultState: Types.state = {
         location: { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 },
      }
      export const defaultProperties: Types.properties = {
         name: "track",
         style: "breadboard",
         holeSpacings: [0]
      }

      export class Instance extends Component.Instance implements Types.properties, Types.state {
         name: string;
         holeSpacings: number[];
         connectorSets: Component.Types.hole[][] = [];
         style: "breadboard" | "stripboard";

         constructor(properties: Types.properties, state: Types.state) {
            super(properties, state);
            this.name = properties.name;
            this.holeSpacings = properties.holeSpacings;
            this.style = properties.style;
         }

         getProperties(): Types.properties {
            return {
               name: this.name,
               holeSpacings: this.holeSpacings,
               style: this.style
            }
         }

         getState(): Types.state {
            return {
               location: this.location
            }
         }



         draw() {
            if (this.style === "breadboard") {
               drawBreadboard(this);
            } else if (this.style === "stripboard") {
               drawStripboard(this);
            } else {
               console.error("Style \"%s\" is invalid", this.style);
            }
         }

         /** Builds and draws the components connectors */
         makeConnectors() {
            let holeSpacingRunningSum = 0;
            this.connectorSets = [[]];
            this.holeSpacings.forEach(hS => {
               this.connectorSets[0].push(Component.Generics.makeConnector(
                  this, "", "hole", { X: (holeSpacingRunningSum += hS), Y: 0 }
               ));
            });
         }

         /** ...
         */
         transferFunction(from: Component.Types.hole): Component.Types.connector[] {
            let fromIdx = this.connectorSets[0].indexOf(from);
            let connected: Component.Types.connector[] = [];
            for (let i = fromIdx + 1; i < this.connectorSets[0].length; i++) {
               if (this.connectorSets[0][i].type === "brokenhole") break;
               connected.push(this.connectorSets[0][i]);
            }
            for (let i = fromIdx - 1; i >= 0; i--) {
               if (this.connectorSets[0][i].type === "brokenhole") break;
               connected.push(this.connectorSets[0][i]);
            }

            return connected;
         }

      }

      const drawStripboard = (component: Instance) => {
         let height = Constants.gridSpacing * 14 / 16;

         // Create the holes
         let holeSpacingRunningSum = 0;

         component.holeSpacings.forEach(hS => {
            component.group.append(new Svg.Elements.Circle(
               { X: (holeSpacingRunningSum += hS), Y: 0 }, 4, "hole"
            ));
         })
         let size = {
            width: holeSpacingRunningSum + Constants.gridSpacing * 0.8,
            height: height
         };

         let centre = {
            X: holeSpacingRunningSum / 2,
            Y: 0
         };

         component.group.prepend(new Svg.Elements.Rect(centre, size, {
            X: 0,
            Y: 0
         }, 'body'));

      }

      const drawBreadboard = (component: Instance) => {
         let height = Constants.gridSpacing * 14 / 16;

         // Create the holes
         let holeSpacingRunningSum = 0;

         component.holeSpacings.forEach(hS => {
            component.group.append(new Svg.Elements.Path(
               "M" + (holeSpacingRunningSum += hS) + " " + 0 + "m-4 -4h 8v 8h -8Z", "hole"
            ));
         })
         let size = {
            width: holeSpacingRunningSum + Constants.gridSpacing * 0.8,
            height: height
         };

         let centre = {
            X: holeSpacingRunningSum / 2,
            Y: 0
         };

         component.group.prepend(new Svg.Elements.Rect(centre, size, {
            X: 0,
            Y: 0
         }, 'body'));
      }

      export const makeInstance = getMaker(Instance, defaultProperties, defaultState,
         (component: Instance) => {
            component.group.addClasses(component.name);
         }
      );
   }

   export const Track = {
      defaultState: Local.defaultState,
      defaultProperties: Local.defaultProperties,
      Instance: Local.Instance,
      makeInstance: Local.makeInstance,
   }

   namespace Reversible {

      export const init = (component: reversibleBoard) => {
         let element = component.group.element;

         $(element).on("select", () => {
            createGhost(component)
         });
         $(element).on("deselect", () => {
            clearGhost(component)
         });

         component.tracks.forEach((track, trackIdx) => {
            let trackBreaks = component.trackBreaks.filter(
               trackBreak => trackBreak.track === trackIdx
            );
            track.connectorSets[0].forEach((hole, holeIdx) => {
               if (trackBreaks.some(trackBreak => trackBreak.hole === holeIdx)) {
                  hole.type = "brokenhole";
               }
            });
         })

      }

      const createGhost = (component: reversibleBoard) => {
         // Create the group
         let ghostGroup = component.group.element.cloneNode() as SVGGraphicsElement;

         let bbox = component.group.element.getBBox();

         //Scale
         Svg.addTransform(ghostGroup, t => t.setScale(-1, 1), false);

         //Translate
         Svg.addTransform(ghostGroup, t => t.setTranslate(-(bbox.width + bbox.x) * 2 - 1, 0), false);

         ghostGroup.appendChild($(component.group.element).children(".body").clone()[0]);

         $(ghostGroup).addClass("reverseghost");
         $(ghostGroup).data("selects", component);

         let parent = (component.group.element.parentElement);
         if (parent) parent.appendChild(ghostGroup);

         let allValidConnectors = Utility.flatten2d(manifest.layout.map(el =>
            Utility.flatten2d(el.connectorSets.map(connectorSet =>
               connectorSet.filter(connector => connector.type === "pin")
            ))
         ));

         // ...
         component.tracks.forEach((track: Addins.Board.Track.Instance, trackIdx) => {
            let trackGhostGroup = $(track.group.element).clone()[0] as any as SVGGraphicsElement;
            ghostGroup.appendChild(trackGhostGroup);

            // Add the holes
            let ctm = (track.group.element.getCTM() || Svg.makeMatrix()).inverse()
            track.connectorSets[0].forEach((hole, holeIdx) => {

               let point = (ctm) ? hole.point.matrixTransform(ctm) : hole.point;

               let breaker = new Svg.Elements.Circle(
                  { X: point.x, Y: point.y }, 6, "breaker"
               );
               if (hole.type === "brokenhole") breaker.addClasses("broken");


               if (getPinsAtHole(hole, allValidConnectors).length) {
                  breaker.addClasses("withPin");
               };

               trackGhostGroup.appendChild(breaker.element);

               let holePosition = { track: trackIdx, hole: holeIdx };

               $(breaker.element).click(() => {

                  if (hole.type === "hole") {
                     breaker.addClasses("broken");
                     hole.type = "brokenhole";
                     component.trackBreaks.push(holePosition);
                  } else if (hole.type === "brokenhole") {
                     breaker.removeClasses("broken");
                     hole.type = "hole";
                     component.trackBreaks = component.trackBreaks.filter(trackBreak =>
                        (trackBreak.hole !== holePosition.hole || trackBreak.track !== holePosition.track)
                     );
                  }
               });
            });
         });
      }

      const clearGhost = (component: reversibleBoard) => {

         let parent = (component.group.element.parentElement);
         if (parent) $(parent).children(".reverseghost").remove();
      }

      function getPinsAtHole(connector: Component.Types.hole, allConnectors: Component.Types.connector[]) {
         let acceptedTypes = ["pin"];

         let point = connector.point;
         let attachedConnectors: Component.Types.connector[] = allConnectors.filter(other => {
            return (
               acceptedTypes.includes(other.type)
               && Utility.pointsAreClose(point, other.point)
            )
         });

         return attachedConnectors;
      }
   }
}
