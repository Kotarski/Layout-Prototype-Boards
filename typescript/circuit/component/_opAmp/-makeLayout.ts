import ValueCheck from "../~valueCheck";
import * as Types from "./types";
import { OpAmpLayout } from "./~classes";
import getMaker from "../../generics/-getMaker";
import { Vector } from "../../../-vector";
import Graphical from "../addins/graphical";
import Draggable from "../addins/draggable";
import Selectable from "../addins/selectable";
import Rotatable from "../addins/rotatable";
import ConnectionsHighlightable from "../addins/connectionsHighlightable"
import { ComponentDefaulter } from "../@component";

const defaulterLayout: ComponentDefaulter<Types.opamp<"layout">> = {
   properties: {
      offsetVoltage: ValueCheck.validate("number", 0)
   },
   states: {
      isDual: ValueCheck.validate("boolean", false),
      joints: ValueCheck.joints<[Vector, Vector]>(
         [{ x: 30, y: 30 }, { x: 40, y: 30 }]
      )
   }
};

const makeLayout = getMaker<OpAmpLayout>(OpAmpLayout, defaulterLayout,
   Graphical,
   Draggable,
   Rotatable,
   Selectable,
   ConnectionsHighlightable
);
export default makeLayout;
