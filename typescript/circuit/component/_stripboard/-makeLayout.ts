import ValueCheck from "../~valueCheck";
import * as Types from "./types";
import { StripboardLayout } from "./~classes";
import getMaker from "../../generics/-getMaker";
import { Vector } from "../../../-vector";
import Graphical from "../addins/graphical";
import Draggable from "../addins/draggable";
import Selectable from "../addins/selectable";
import Board from "../addins/board";
import WiresCreatable from "../addins/wiresCreatable"
import Rotatable from "../addins/rotatable";
import ReversableBoard from "../addins/reversableBoard";


const defaulterLayout: ValueCheck.Defaulter<Types.values> = {
   joints: ValueCheck.joints<[Vector, Vector]>(
      [{ x: 0, y: 0 }, { x: 20, y: 0 }]
   ),
   rows: ValueCheck.integer(1),
   columns: ValueCheck.integer(1),
   trackBreaks: validateTrackBreaks([]),
};

function validateTrackBreaks<T extends Types.trackBreak[]>(fallback: T): ValueCheck.validater<T> {
   const result = (value: unknown, log: boolean = true) => {
      const predicate = (v: unknown) => ((value && Array.isArray(value) && value.every((tB: Types.trackBreak) => {
         return (('track' in tB) && ('hole' in tB) && (typeof tB.track === 'number') && (typeof tB.hole === 'number'));
      })));

      return ValueCheck.validate<T>(predicate, fallback)(value);
   }

   return result;
}

const makeLayout = getMaker(StripboardLayout, defaulterLayout,
   Graphical,
   Board,
   ReversableBoard,
   Selectable,
   WiresCreatable,
   Draggable,
   Rotatable
);
export default makeLayout;
