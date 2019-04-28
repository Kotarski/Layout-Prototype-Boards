import ValueCheck from "../~valueCheck";
import * as Types from "./types";
import { PowerSchematic } from "./~classes";
import getMaker from "../../generics/-getMaker";
import { Vector } from "../../../-vector";
import Graphical from "../addins/graphical";
import Draggable from "../addins/draggable";
import Selectable from "../addins/selectable";
import ConnectionsHighlightable from "../addins/connectionsHighlightable";
import { ComponentDefaulter } from "../@component";

const defaulterSchematic: ComponentDefaulter<Types.power<"schematic">> = {
   properties: {
      voltage: ValueCheck.validate("number", 0)
   },
   states: {
      joints: ValueCheck.joints<[Vector]>(
         [{ x: 0, y: 0 }]
      )
   }
};


const makeSchematic = getMaker(PowerSchematic, defaulterSchematic,
   Selectable,
   ConnectionsHighlightable,
   Graphical,
   Draggable
);

export default makeSchematic;