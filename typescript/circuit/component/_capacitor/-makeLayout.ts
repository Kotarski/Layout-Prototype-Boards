import ValueCheck from "../~valueCheck";
import * as Types from "./types";
import { CapacitorLayout } from "./~classes";
import getMaker from "../../generics/-getMaker";
import { Vector } from "../../../-vector";
import Graphical from "../addins/graphical";
import Draggable from "../addins/draggable";
import Selectable from "../addins/selectable";
import Extendable from "../addins/extendable";
import ConnectionsHighlightable from "../addins/connectionsHighlightable"
import { ComponentDefaulter } from "../@component";

const defaulterLayout: ComponentDefaulter<Types.capacitor<"layout">> = {
   properties: {
      isPolarised: ValueCheck.validate("boolean", false),
      capacitance: ValueCheck.validate("number", 0)
   },
   states: {
      joints: ValueCheck.joints<[Vector, Vector]>(
         [{ x: 0, y: 0 }, { x: 80, y: 0 }]
      )
   }
};

const makeLayout = getMaker(CapacitorLayout, defaulterLayout,
   Graphical,
   Draggable,
   Selectable,
   Extendable,
   ConnectionsHighlightable
);
export default makeLayout;