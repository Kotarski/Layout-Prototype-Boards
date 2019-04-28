import ValueCheck from "../~valueCheck";
import * as Types from "./types";
import { Small } from "./~classes";
import getMaker from "../../generics/-getMaker";
import { Vector } from "../../../-vector";
import Graphical from "../addins/graphical";
import Draggable from "../addins/draggable";
import Selectable from "../addins/selectable";
import Board from "../addins/board";
import WiresCreatable from "../addins/wiresCreatable";
import Rotatable from "../addins/rotatable";
import { ComponentDefaulter } from "../@component";

const defaulterSmall: ComponentDefaulter<Types.breadboard<"layout">> = {
   properties: {

   },
   states: {
      joints: ValueCheck.joints<[Vector, Vector]>(
         [{ x: 0, y: 0 }, { x: 20, y: 0 }]
      ),
   }
};


const makeSmall = getMaker<Small>(Small, defaulterSmall,
   Graphical,
   Board,
   Selectable,
   WiresCreatable,
   Draggable,
   Rotatable
);
export default makeSmall;