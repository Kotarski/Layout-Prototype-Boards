import ValueCheck from "../~valueCheck";
import * as Types from "./types";
import { Layout } from "./~classes";
import getMaker from "../../generics/-getMaker";
import { Vector } from "../../../-vector";
import Graphical from "../addins/graphical";
import Draggable from "../addins/draggable";
import Selectable from "../addins/selectable";
import Extendable from "../addins/extendable";
import ConnectionHighlights from "../addins/connectionHighlights"

const defaulterLayout: ValueCheck.Defaulter<Types.values> = {
   name: ValueCheck.validate("string", "resistor"),
   disabled: ValueCheck.validate("boolean", false),
   joints: ValueCheck.joints<[Vector, Vector]>(
      [{ x: 0, y: 0 }, { x: 40, y: 40 }]
   ),
   resistance: ValueCheck.validate("number", 0)
};

const makeLayout = getMaker(Layout, defaulterLayout, [
   Graphical,
   Draggable,
   Selectable,
   Extendable,
   ConnectionHighlights
]);
export default makeLayout;
