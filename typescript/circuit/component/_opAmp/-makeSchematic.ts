import ValueCheck from "../~valueCheck";
import * as Types from "./types";
import { Schematic } from "./~classes";
import getMaker from "../../generics/-getMaker";
import { Vector } from "../../../-vector";
import Graphical from "../addins/graphical";
import Draggable from "../addins/draggable";
import Selectable from "../addins/selectable";
import Extendable from "../addins/extendable";
import ConnectionHighlights from "../addins/connectionHighlights";
import ControlValues from "../../../~controlValues";

const defaulterSchematic: ValueCheck.Defaulter<Types.valuesSchematic> = {
   name: ValueCheck.validate("string", "opAmp"),
   disabled: ValueCheck.validate("boolean", false),
   joints: ValueCheck.joints<[Vector, Vector, Vector, Vector, Vector]>(
      [{ x: -30, y: -10 }, { x: -30, y: +10 }, { x: 40, y: 0 }, { x: 0, y: -20 }, { x: 0, y: 20 }]
   ),
   offsetVoltage: ValueCheck.validate("number", 0)
};


const makeSchematic = getMaker(Schematic, defaulterSchematic,
   (component: Schematic) => {
      Selectable.init(component);
      ConnectionHighlights.init(component, false);
      Graphical.init(component);
      if (ControlValues.schematicEditingEnabled) {
         Draggable.init(component);
         Extendable.init(component);
      }
   }
);

export default makeSchematic;