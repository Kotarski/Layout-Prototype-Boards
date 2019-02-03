import ValueCheck from "../~valueCheck";
import * as Types from "./types";
import { Schematic } from "./~classes";
import getMaker from "../../generics/-getMaker";
import { Vector } from "../../../-vector";
import Graphical from "../addins/graphical";
import Draggable from "../addins/draggable";
import Selectable from "../addins/selectable";
import Extendable from "../addins/extendable";
import ConnectionHighlights from "../addins/connectionHighlights"
import ControlValues from "../../../~controlValues";

const defaulterSchematic: ValueCheck.Defaulter<Types.values> = {
   name: ValueCheck.validate("string", "diode"),
   disabled: ValueCheck.validate("boolean", false),
   joints: ValueCheck.joints<[Vector, Vector]>(
      [{ x: 0, y: 0 }, { x: 40, y: 40 }]
   ),
   breakdownVoltage: ValueCheck.validate("number", 0),
   saturationCurrent: ValueCheck.validate("number", 0),
   color: ValueCheck.color("N/A")
};


const makeSchematic = getMaker(Schematic, defaulterSchematic, [
   Graphical,
   Selectable,
   ConnectionHighlights,
   ...ControlValues.schematicEditingEnabled ? [
      Draggable,
      Extendable
   ] : []
]);
export default makeSchematic;