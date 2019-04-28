import ValueCheck from "../~valueCheck";
import * as Types from "./types";
import { BipolarSchematic } from "./~classes";
import getMaker from "../../generics/-getMaker";
import { Vector } from "../../../-vector";
import Graphical from "../addins/graphical";
import Draggable from "../addins/draggable";
import Selectable from "../addins/selectable";
import Extendable from "../addins/extendable";
import ConnectionsHighlightable from "../addins/connectionsHighlightable"
import { ComponentDefaulter } from "../@component";

const defaulterSchematic: ComponentDefaulter<Types.bipolar<"schematic">> = {
   properties: {
      currentGain: ValueCheck.validate("number", 0),
      type: ValueCheck.validate<"NPN" | "PNP">(["NPN", "PNP"], "NPN")
   },
   states: {
      joints: ValueCheck.joints<[Vector, Vector, Vector]>(
         [{ x: -50, y: 0 }, { x: +10, y: -50 }, { x: +10, y: +50 }]
      )
   }
};


const makeSchematic = getMaker(BipolarSchematic, defaulterSchematic,
   Selectable,
   ConnectionsHighlightable,
   Graphical,
   Draggable,
   Extendable
);
export default makeSchematic;