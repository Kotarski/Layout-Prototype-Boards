import ValueCheck from "../~valueCheck";
import * as Types from "./types";
import { Schematic } from "./~classes";
import getMaker from "../../generics/-getMaker";
import Graphical from "../addins/graphical";
import Draggable from "../addins/draggable";
import Selectable from "../addins/selectable";
import Extendable from "../addins/extendable";
import Junctions from "../addins/junctions"

const defaulterSchematic: ValueCheck.Defaulter<Types.valuesSchematic> = {
   joints: ValueCheck.joints([{ x: 0, y: 0 }, { x: 10, y: 10 }], l => l >= 2)
};

// TODO: Pass in options for extendable and others (options={?}) (true,true)
export const makeSchematic = getMaker(
   Schematic, defaulterSchematic,
   Junctions,
   Selectable,
   Graphical,
   Draggable,
   [Extendable, { reticulatable: true, removable: true}]
);
export default makeSchematic;
