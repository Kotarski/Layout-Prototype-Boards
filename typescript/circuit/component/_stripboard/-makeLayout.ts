import ValueCheck from "../~valueCheck";
import * as Types from "./types";
import { Layout } from "./~classes";
import getMaker from "../../generics/-getMaker";
import { Vector } from "../../../-vector";
import Graphical from "../addins/graphical";
import Draggable from "../addins/draggable";
import Selectable from "../addins/selectable";
import Board from "../addins/board";
import WireCreation from "../addins/wireCreation"
import Rotatable from "../addins/rotatable";


const defaulterLayout: ValueCheck.Defaulter<Types.values> = {
   name: ValueCheck.validate("string", "stripboard"),
   disabled: ValueCheck.validate("boolean", false),
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

const makeLayout = getMaker(Layout, defaulterLayout,
   (component: Layout) => {
      Graphical.init(component);
      Board.init(component, true);
      Selectable.init(component);
      WireCreation.init(component);
      Draggable.init(component);
      Rotatable.init(component);
   }
);
export default makeLayout;

