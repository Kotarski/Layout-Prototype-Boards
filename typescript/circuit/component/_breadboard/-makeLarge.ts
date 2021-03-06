import ValueCheck from "../~valueCheck";
import * as Types from "./types";
import { Large } from "./~classes";
import getMaker from "../../generics/-getMaker";
import { Vector } from "../../../-vector";
import Graphical from "../addins/graphical";
import Draggable from "../addins/draggable";
import Selectable from "../addins/selectable";
import Board from "../addins/board";
import WireCreation from "../addins/wireCreation"

const defaulterLarge: ValueCheck.Defaulter<Types.values> = {
   name: ValueCheck.validate("string", "breadboardlarge"),
   disabled: ValueCheck.validate("boolean", false),
   joints: ValueCheck.joints<[Vector, Vector]>(
      [{ x: 0, y: 0 }, { x: 20, y: 0 }]
   ),
};

const makeLarge = getMaker(Large, defaulterLarge,
   (component: Large) => {
      Graphical.init(component);
      Board.init(component);
      Selectable.init(component);
      WireCreation.init(component);
      Draggable.init(component);
   }
);
export default makeLarge;