import ValueCheck from "../~valueCheck";
import * as Types from "./types";
import { Layout } from "./~classes";
import getMaker from "../../generics/-getMaker";
import Graphical from "../addins/graphical";
import Draggable from "../addins/draggable";
import Selectable from "../addins/selectable";
import Extendable from "../addins/extendable";
import ConnectionHighlights from "../addins/connectionHighlights";
import Recolorable from "../addins/recolorable";

const defaulterLayout: ValueCheck.Defaulter<Types.valuesLayout> = {
   name: ValueCheck.validate("string", "wire"),
   disabled: ValueCheck.validate("boolean", false),
   joints: ValueCheck.joints(
      [{ x: 0, y: 0 }, { x: 80, y: 0 }], l => l >= 2
   ),
   color: ValueCheck.color("#545454")
};

// TODO: Pass in options for extendable and others (options={?}) (() => getRecolorPosition(component))
export const makeLayout = getMaker(Layout, defaulterLayout, [
   Graphical,
   Draggable,
   Selectable,
   Extendable,
   ConnectionHighlights,
   Recolorable
]);

export default makeLayout;