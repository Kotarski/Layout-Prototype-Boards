import ValueCheck from "../~valueCheck";
import * as Types from "./types";
import { BipolarSchematic } from "./~classes";
import getMaker from "../../generics/-getMaker";
import { Vector } from "../../../-vector";
import Graphical from "../addins/graphical";
import Draggable from "../addins/draggable";
import Selectable from "../addins/selectable";
import Extendable from "../addins/extendable";
import ConnectionHighlights from "../addins/connectionHighlights"
import { schematicManipulationEnabled } from "../../../~constants";

const defaulterSchematic: ValueCheck.Defaulter<Types.values> = {
   name: ValueCheck.validate("string", "bipolar"),
   disabled: ValueCheck.validate("boolean", false),
   joints: ValueCheck.joints<[Vector, Vector, Vector]>(
      [{ x: -50, y: 0 }, { x: +10, y: -50 }, { x: +10, y: +50 }]
   ),
   currentGain: ValueCheck.validate("number", 0),
   type: ValueCheck.validate<"NPN" | "PNP">(["NPN", "PNP"], "NPN")
};


const makeSchematic = getMaker(BipolarSchematic, defaulterSchematic,
   (component: BipolarSchematic) => {
      Selectable.init(component);
      ConnectionHighlights.init(component, false);
      Graphical.init(component);
      if (schematicManipulationEnabled) {
         Draggable.init(component);
         Extendable.init(component);
      }
   }
);
export default makeSchematic;