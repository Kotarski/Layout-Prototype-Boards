import ValueCheck from "../~valueCheck";
import * as Types from "./types";
import { Layout } from "./~classes";
import getMaker from "../../generics/-getMaker";
import { Vector } from "../../../-vector";
import Graphical from "../addins/graphical";
import Draggable from "../addins/draggable";
import Selectable from "../addins/selectable";
import Rotatable from "../addins/rotatable";
import ConnectionsHighlightable from "../addins/connectionsHighlightable"

const defaulterLayout: ValueCheck.Defaulter<Types.valuesLayout> = {
   isDual: ValueCheck.validate("boolean", false),
   joints: ValueCheck.joints<[Vector, Vector]>(
      [{ x: 30, y: 30 }, { x: 40, y: 30 }]
   ),
   offsetVoltage: ValueCheck.validate("number", 0)
};

const makeLayout = getMaker(Layout, defaulterLayout,
   Graphical,
   Draggable,
   Rotatable,
   Selectable,
   ConnectionsHighlightable
);
export default makeLayout;
