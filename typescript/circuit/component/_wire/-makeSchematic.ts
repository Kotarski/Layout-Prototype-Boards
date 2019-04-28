import ValueCheck from "../~valueCheck";
import * as Types from "./types";
import { WireSchematic } from "./~classes";
import getMaker from "../../generics/-getMaker";
import Graphical from "../addins/graphical";
import Draggable from "../addins/draggable";
import Selectable from "../addins/selectable";
import Extendable from "../addins/extendable";
import Junctions from "../addins/junctions"
import { ComponentDefaulter } from "../@component";

const defaulterSchematic: ComponentDefaulter<Types.wire<"schematic">> = {
   properties: {

   },
   states: {
      joints: ValueCheck.joints([{ x: 0, y: 0 }, { x: 10, y: 10 }], l => l >= 2)
   }
};

// TODO: Pass in options for extendable and others (options={?}) (true,true)
export const makeSchematic = getMaker<WireSchematic>(WireSchematic, defaulterSchematic,
   Junctions,
   Selectable,
   Graphical,
   Draggable,
   [Extendable, { reticulatable: true, removable: true}]
);
export default makeSchematic;
