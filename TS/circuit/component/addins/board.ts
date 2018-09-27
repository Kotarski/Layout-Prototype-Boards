namespace Circuit.Component.Addins.Board {
   type board = Component.Instance & {
      connectorSets: Component.Types.hole[][],
      tracks: Track.Instance[]
   }
   export interface reversibleBoard extends board {
      trackBreaks: { track: number, hole: number }[];
   }

   export function init<B extends board>(component: B): void
   export function init<B extends reversibleBoard>(component: B, isReversible: boolean): void
   export function init<B extends board | reversibleBoard>(component: B, isReversible?: boolean): void {
      $(component.group.element).addClass("board");


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

         export interface state extends Component.Types.state {
            joints: [Vector, Vector];
         }
      }
   }

   namespace Local {
      import Types = Track.Types;

      export const defaulter: ValueCheck.Defaulter<Types.state & Types.properties> = {
         name: ValueCheck.validate("string", "track"),
         style: ValueCheck.validate<"breadboard" | "stripboard">(["breadboard", "stripboard"], "breadboard"),
         disabled: ValueCheck.validate("boolean", false),
         joints: ValueCheck.joints<[Vector, Vector]>(
            [{ x: 0, y: 0 }, { x: 20, y: 0 }]
         ),
         holeSpacings: ValueCheck.validate(
            v => Array.isArray(v) && v.every(ValueCheck.test("number")), [0]
         ),
      };

      export class Instance extends Component.Instance implements Types.properties, Types.state {
         name: string;
         holeSpacings: number[];
         connectorSets: Component.Types.hole[][] = [];
         style: "breadboard" | "stripboard";
         joints: [Vector, Vector];

         constructor(values: Types.properties & Types.state) {
            super(values);
            this.name = values.name;
            this.holeSpacings = values.holeSpacings;
            this.style = values.style;
            this.joints = values.joints;
         }

         getProperties(): Types.properties {
            return Utility.deepCopy({
               name: this.name,
               holeSpacings: this.holeSpacings,
               style: this.style
            });
         }

         getState(): Types.state {
            return Utility.deepCopy({
               joints: this.joints,
               disabled: this.disabled
            });
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

            const start = this.joints[0];
            const step = this.joints[1];


            this.connectorSets = [[]];
            // Create the holes
            let accHs = 0;
            this.holeSpacings.forEach((hS) => {
               accHs += hS;

               let holePos = vector(step)
                  .scaleWith(accHs)
                  .sumWith(start)
                  .vector;

               this.connectorSets[0].push(
                  Component.Generics.makeConnector(this, "", "hole", holePos)
               );
            })
         }

         getConnections(): Component.Types.connector[][][] {
            return Generics.getComponentConnections(this, manifest.layout);
         }

         insertInto(element?: SVGGraphicsElement) {
            Utility.Insert.last(this.group.element, element);
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

         const start = component.joints[0];
         const step = component.joints[1];

         // Create the holes
         let accHs = 0;
         component.holeSpacings.forEach((hS) => {
            accHs += hS;

            let holePos = vector(step)
               .scaleWith(accHs)
               .sumWith(start)
               .vector;

            component.group.append(Svg.Element.Circle.make(holePos, 4, "hole"));
         })

         // Create the track
         let relativeEnd = vector(step).scaleWith(accHs).vector;

         let { radius, angle } = vector(relativeEnd).asPolar();

         let centre = vector(start, start, relativeEnd).sum().scaleWith(0.5).vector;

         let size = {
            width: radius + Constants.gridSpacing,
            height: Constants.gridSpacing * 14 / 16
         }

         component.group.prepend(Svg.Element.Rect.make(centre, size, vector(0), 'body').rotate(angle, centre));
      }

      const drawBreadboard = (component: Instance) => {

         const start = component.joints[0];
         const step = component.joints[1];

         // Create the holes
         let accHs = 0;
         component.holeSpacings.forEach((hS) => {
            accHs += hS;

            let holePos = vector(step)
               .scaleWith(accHs)
               .sumWith(start)
               .vector;

            component.group.append(Svg.Element.Rect.make(holePos, { width: 8, height: 8 }, vector(0.5), "hole"));
         })

         // Create the track
         let relativeEnd = vector(step).scaleWith(accHs).vector;

         let { radius, angle } = vector(relativeEnd).asPolar();

         let centre = vector(start, start, relativeEnd).sum().scaleWith(0.5).vector;

         let size = {
            width: radius + Constants.gridSpacing * 0.8,
            height: Constants.gridSpacing * 14 / 16
         }

         component.group.prepend(Svg.Element.Rect.make(centre, size, vector(0), 'body').rotate(angle, centre));
      }

      export const makeInstance = getMaker(Instance, defaulter,
         (component: Instance) => {
            $(component.group.element).addClass(component.name);
         }
      );
   }

   export const Track = {

      instance: Local.Instance,
      make: Local.makeInstance,
   }

   namespace Reversible {

      export const init = (component: reversibleBoard) => {
         let element = component.group;

         $(element.element).on(Events.select, () => {
            createGhost(component);
         });

         $(element.element).on(Events.dragStart, () => {
            clearGhost(component);
         });

         $(element.element).on(Events.rotate, () => {
            clearGhost(component);
            createGhost(component);
         });

         $(element.element).on(Events.dragStop, () => {
            createGhost(component);
         });

         $(element.element).on(Events.deselect, () => {
            clearGhost(component);
         });

         $(element.element).on(Events.draw, () => {
            if ($(element.element).hasClass("selected")) {
               clearGhost(component);
               createGhost(component);
            }
         });



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
            //let ctm = (track.group.element.getCTM() || Svg.makeMatrix()).inverse()
            track.connectorSets[0].forEach((hole, holeIdx) => {

               let point = hole.point;//(ctm) ? hole.point.matrixTransform(ctm) : hole.point;

               let breaker = Svg.Element.Circle.make(point, 6, "breaker");

               if (hole.type === "brokenhole") {
                  $(breaker.element).addClass("broken");
               }


               if (getPinsAtHole(hole, allValidConnectors).length) {
                  $(breaker.element).addClass("withPin");
               };

               trackGhostGroup.appendChild(breaker.element);

               let holePosition = { track: trackIdx, hole: holeIdx };

               $(breaker.element).click(() => {
                  history.add(component);

                  if (hole.type === "hole") {
                     $(breaker.element).addClass("broken");
                     hole.type = "brokenhole";
                     component.trackBreaks.push(holePosition);
                  } else if (hole.type === "brokenhole") {
                     $(breaker.element).removeClass("broken");
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
               && vector(point).isCloseTo(other.point)
            )
         });

         return attachedConnectors;
      }
   }
}
