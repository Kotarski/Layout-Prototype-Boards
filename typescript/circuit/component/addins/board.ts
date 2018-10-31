import Component, { Types as ComponentTypes } from "../../+component";
import vector, { Vector } from "../../../-vector";
import Events from "../../events";
import manifest from "../../manifest";
import history from "../../history";
import { Layout as Track } from "../_track/~classes";
import Flatten from "../../../utility/~flatten";
import addTransform from "../../../svg/-addTransform";
import { make as makeCircle } from "../../../svg/element/+circle"
//import * as $ from 'jquery';
namespace Board {
   export type board = Component & {
      connectorSets: ComponentTypes.hole[][],
      tracks: Track[],
      joints: Vector[]
   }
   export interface reversibleBoard extends board {
      trackBreaks: { track: number, hole: number }[];
   }

   export function init<B extends board>(component: B): void
   export function init<B extends reversibleBoard>(component: B, isReversible: boolean): void
   export function init<B extends board | reversibleBoard>(component: B, isReversible?: boolean): void {
      $(component.group.element).addClass("board");


      Object.defineProperty(component, 'connectorSets', {
         get: () => Flatten.flatten2d(component.tracks.map(track => track.connectorSets))
      });

      if (isReversible) {
         Reversible.init(component as reversibleBoard);
      }
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
         addTransform(ghostGroup, t => t.setScale(-1, 1), false);

         //Translate
         addTransform(ghostGroup, t => t.setTranslate(-(bbox.width + bbox.x) * 2 - 1, 0), false);

         ghostGroup.appendChild($(component.group.element).children(".body").clone()[0]);

         $(ghostGroup).addClass("reverseghost");
         $(ghostGroup).data("selects", component);

         let parent = (component.group.element.parentElement);
         if (parent) parent.appendChild(ghostGroup);

         let allValidConnectors = Flatten.flatten2d(manifest.layout.map(el =>
            Flatten.flatten2d(el.connectorSets.map(connectorSet =>
               connectorSet.filter(connector => connector.type === "pin")
            ))
         ));

         // ...
         component.tracks.forEach((track, trackIdx) => {
            let trackGhostGroup = $(track.group.element).clone()[0] as any as SVGGraphicsElement;
            ghostGroup.appendChild(trackGhostGroup);

            // Add the holes
            //let ctm = (track.group.element.getCTM() || Svg.makeMatrix()).inverse()
            track.connectorSets[0].forEach((hole, holeIdx) => {

               let point = hole.point;//(ctm) ? hole.point.matrixTransform(ctm) : hole.point;

               let breaker = makeCircle(point, 6, "breaker");

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

      function getPinsAtHole(connector: ComponentTypes.hole, allConnectors: ComponentTypes.connector[]) {
         let acceptedTypes = ["pin"];

         let point = connector.point;
         let attachedConnectors: ComponentTypes.connector[] = allConnectors.filter(other => {
            return (
               acceptedTypes.includes(other.type)
               && vector(point).isCloseTo(other.point)
            )
         });

         return attachedConnectors;
      }
   }
}
export default Board;
