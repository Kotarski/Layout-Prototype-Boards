import ValueCheck from "../~valueCheck";
import * as Types from "./types";
import { PowerSchematic } from "./~classes";
import getMaker from "../../generics/-getMaker";
import { Vector } from "../../../-vector";
import Graphical from "../addins/graphical";
import Draggable from "../addins/draggable";
import Selectable from "../addins/selectable";
import ConnectionsHighlightable from "../addins/connectionsHighlightable";

const defaulterSchematic: ValueCheck.Defaulter<Types.values> = {
   name: ValueCheck.validate("string", "power"),
   disabled: ValueCheck.validate("boolean", false),
   joints: ValueCheck.joints<[Vector]>(
      [{ x: 0, y: 0 }]
   ),
   voltage: ValueCheck.validate("number", 0)
};


const makeSchematic = getMaker(PowerSchematic, defaulterSchematic,
   Selectable,
   ConnectionsHighlightable,
   Graphical,
   Draggable
);

export default makeSchematic;