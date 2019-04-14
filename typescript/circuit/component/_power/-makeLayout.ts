import ValueCheck from "../~valueCheck";
import * as Types from "./types";
import { PowerLayout } from "./~classes";
import getMaker from "../../generics/-getMaker";
import { Vector } from "../../../-vector";
import Graphical from "../addins/graphical";
import Draggable from "../addins/draggable";
import Selectable from "../addins/selectable";
import ConnectionsHighlightable from "../addins/connectionsHighlightable";
import WiresCreatable from "../addins/wiresCreatable";

const defaulterLayout: ValueCheck.Defaulter<Types.values> = {
   joints: ValueCheck.joints<[Vector]>(
      [{ x: 0, y: 40 }]
   ),
   voltage: ValueCheck.validate("number", 0)
};

const makeLayout = getMaker(PowerLayout, defaulterLayout,
   Graphical,
   Draggable,
   Selectable,
   ConnectionsHighlightable,
   WiresCreatable
);

// TODO: Pass into connection highlight
// function getHighlightColor(component: PowerLayout): string[] {
//    return [(component.voltage < 0)
//       ? "blue" // negative
//       : (component.voltage > 0)
//          ? "red" // positive
//          : "black" // zero (ground);
//    ]
// }
export default makeLayout;
