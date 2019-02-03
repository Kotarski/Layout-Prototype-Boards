import ValueCheck from "../~valueCheck";
import * as Types from "./types";
import { Layout } from "./~classes";
import getMaker from "../../generics/-getMaker";
import { Vector } from "../../../-vector";
import Graphical from "../addins/graphical";
import Draggable from "../addins/draggable";
import Selectable from "../addins/selectable";
import Rotatable from "../addins/rotatable";
import ConnectionHighlights from "../addins/connectionHighlights"

const defaulterLayout: ValueCheck.Defaulter<Types.valuesLayout> = {
   name: ValueCheck.validate("string", "opAmp"),
   disabled: ValueCheck.validate("boolean", false),
   isDual: ValueCheck.validate("boolean", false),
   joints: ValueCheck.joints<[Vector, Vector]>(
      [{ x: 30, y: 30 }, { x: 40, y: 30 }]
   ),
   offsetVoltage: ValueCheck.validate("number", 0)
};

const makeLayout = getMaker(Layout, defaulterLayout, [
   Graphical,
   Draggable,
   Rotatable,
   Selectable,
   ConnectionHighlights
]);
export default makeLayout;
