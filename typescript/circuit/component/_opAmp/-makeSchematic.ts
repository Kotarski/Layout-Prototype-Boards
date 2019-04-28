import ValueCheck from "../~valueCheck";
import * as Types from "./types";
import { OpAmpSchematic } from "./~classes";
import getMaker from "../../generics/-getMaker";
import { Vector } from "../../../-vector";
import Graphical from "../addins/graphical";
import Draggable from "../addins/draggable";
import Selectable from "../addins/selectable";
import Extendable from "../addins/extendable";
import ConnectionsHighlightable from "../addins/connectionsHighlightable";
import { ComponentDefaulter } from "../@component";

const defaulterSchematic: ComponentDefaulter<Types.opamp<"schematic">> = {
   properties: {
      offsetVoltage: ValueCheck.validate("number", 0)
   },
   states: {
      joints: ValueCheck.joints<[Vector, Vector, Vector, Vector, Vector]>(
         [{ x: -30, y: -10 }, { x: -30, y: +10 }, { x: 40, y: 0 }, { x: 0, y: -20 }, { x: 0, y: 20 }]
      ),
   }
};


const makeSchematic = getMaker<OpAmpSchematic>(OpAmpSchematic, defaulterSchematic,
   Selectable,
   ConnectionsHighlightable,
   Graphical,
   Draggable,
   Extendable
);

export default makeSchematic;