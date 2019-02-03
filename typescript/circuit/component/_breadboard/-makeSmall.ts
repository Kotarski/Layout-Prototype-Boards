import ValueCheck from "../~valueCheck";
import * as Types from "./types";
import { Small } from "./~classes";
import getMaker from "../../generics/-getMaker";
import { Vector } from "../../../-vector";
import Graphical from "../addins/graphical";
import Draggable from "../addins/draggable";
import Selectable from "../addins/selectable";
import Board from "../addins/board";
import WireCreation from "../addins/wireCreation";
import Rotatable from "../addins/rotatable";

const defaulterSmall: ValueCheck.Defaulter<Types.values> = {
   name: ValueCheck.validate("string", "breadboardsmall"),
   disabled: ValueCheck.validate("boolean", false),
   joints: ValueCheck.joints<[Vector, Vector]>(
      [{ x: 0, y: 0 }, { x: 20, y: 0 }]
   ),
};


const makeSmall = getMaker(Small, defaulterSmall, [
   Graphical,
   Board,
   Selectable,
   WireCreation,
   Draggable,
   Rotatable
]);
export default makeSmall;