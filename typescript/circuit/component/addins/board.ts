import Component, { Types as ComponentTypes } from "../../+component";
import { Layout as Track } from "../_track/~classes";
import Flatten from "../../../utility/~flatten";
//import * as $ from 'jquery';

type board = Component & {
   connectorSets: ComponentTypes.hole[][],
   tracks: Track[]
}

const Board = (() => {
   const init = (component: board) => {
      $(component.group.element).addClass("board");

      Object.defineProperty(component, 'connectorSets', {
         get: () => Flatten.flatten2d(component.tracks.map(track => track.connectorSets))
      });
   }

   return { init }
})()
export default Board;
