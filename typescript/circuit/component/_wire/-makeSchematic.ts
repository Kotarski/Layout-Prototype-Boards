import ValueCheck from "../~valueCheck";
import * as Types from "./types";
import { Schematic } from "./~classes";
import getMaker from "../../generics/-getMaker";
import Graphical from "../addins/graphical";
import Draggable from "../addins/draggable";
import Selectable from "../addins/selectable";
import Extendable from "../addins/extendable";
import Junctions from "../addins/junctions"

import { schematicManipulationEnabled } from "../../../~constants";

const defaulterSchematic: ValueCheck.Defaulter<Types.valuesSchematic> = {
   name: ValueCheck.validate("string", "wire"),
   disabled: ValueCheck.validate("boolean", false),
   joints: ValueCheck.joints(
      [{ x: 0, y: 0 }, { x: 10, y: 10 }], l => l >= 2
   )
};


export const makeSchematic = getMaker(
   Schematic, defaulterSchematic,
   (component: Schematic) => {
      Junctions.init(component);
      Selectable.init(component);
      Graphical.init(component);
      if (schematicManipulationEnabled) {
         Draggable.init(component);
         Extendable.init(component, true, true);
      }
   }
);
export default makeSchematic;
