import ValueCheck from "../~valueCheck";
import * as Types from "./types";
import { BipolarLayout } from "./~classes";
import getMaker from "../../generics/-getMaker";
import { Vector } from "../../../-vector";
import Graphical from "../addins/graphical";
import Draggable from "../addins/draggable";
import Selectable from "../addins/selectable";
import Extendable from "../addins/extendable";
import ConnectionsHighlightable from "../addins/connectionsHighlightable";
import { ComponentDefaulter } from "../@component";

const defaulterLayout: ComponentDefaulter<Types.bipolar<"layout">> = {
   properties: {
      currentGain: ValueCheck.validate("number", 0),
      type: ValueCheck.validate<"NPN" | "PNP">(["NPN", "PNP"], "NPN")
   },
   states: {
      joints: ValueCheck.joints<[Vector, Vector, Vector]>(
         [{ x: 0, y: 0 }, { x: 20, y: -20 }, { x: 40, y: 0 }]
      )
   }
};

const makeLayout = getMaker(BipolarLayout, defaulterLayout,
   Graphical,
   Draggable,
   Selectable,
   Extendable,
   ConnectionsHighlightable
);
export default makeLayout;

