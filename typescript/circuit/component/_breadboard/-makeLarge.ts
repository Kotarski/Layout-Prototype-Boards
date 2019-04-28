import ValueCheck from "../~valueCheck";
import * as Types from "./types";
import { Large } from "./~classes";
import getMaker from "../../generics/-getMaker";
import { Vector } from "../../../-vector";
import Graphical from "../addins/graphical";
import Draggable from "../addins/draggable";
import Selectable from "../addins/selectable";
import Board from "../addins/board";
import WiresCreatable from "../addins/wiresCreatable"
import { ComponentDefaulter } from "../@component";

const defaulterLarge: ComponentDefaulter<Types.breadboard<"layout">> = {
   properties: {

   },
   states: {
      joints: ValueCheck.joints<[Vector, Vector]>(
         [{ x: 0, y: 0 }, { x: 20, y: 0 }]
      ),
   }
};

const makeLarge = getMaker<Large>(Large, defaulterLarge,
   Graphical,
   Board,
   Selectable,
   WiresCreatable,
   Draggable
);
export default makeLarge;