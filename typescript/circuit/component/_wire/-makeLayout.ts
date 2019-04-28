import ValueCheck from "../~valueCheck";
import * as Types from "./types";
import { Layout } from "./~classes";
import getMaker from "../../generics/-getMaker";
import Graphical from "../addins/graphical";
import Draggable from "../addins/draggable";
import Selectable from "../addins/selectable";
import Extendable from "../addins/extendable";
// import Extendable_ from "../addins/extendable_";
import ConnectionsHighlightable from "../addins/connectionsHighlightable";
import Recolorable from "../addins/recolorable";
import { ComponentDefaulter } from "../@component";

const defaulterLayout: ComponentDefaulter<Types.wire<"layout">> = {
   properties: {

   },
   states: {
      joints: ValueCheck.joints(
         [{ x: 0, y: 0 }, { x: 80, y: 0 }], l => l >= 2
      ),
      color: ValueCheck.color("#545454")
   }
};

export const makeLayout = getMaker(Layout, defaulterLayout,
   Graphical,
   Draggable,
   Selectable,
   [Extendable, { reticulatable: true, removable: true }],
   // [Extendable_, { reticulatable: true, removable: true }],
   [ConnectionsHighlightable, {}],
   Recolorable
);

//{ canAddJoints: true, canRemoveJoints: true, canRemoveComponent: true }
export default makeLayout;