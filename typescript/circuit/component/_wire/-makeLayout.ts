import ValueCheck from "../~valueCheck";
import * as Types from "./types";
import { Layout } from "./~classes";
import getMaker from "../../generics/-getMaker";
import toVector from "../../../utility/polar/-toVector"
import vector, { Vector } from "../../../-vector";
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

export const makeLayout = getMaker(Layout, defaulterLayout,
   (component: Layout) => {
      Graphical.init(component);
      Draggable.init(component);
      Selectable.init(component);
      Extendable.init(component, true, true, true);
      ConnectionHighlights.init(component);
      Recolorable.init(component, () => getRecolorPosition(component));
   }
);

function getRecolorPosition(component: Layout): Vector {
   const angle = vector(component.joints[0]).getAngleTo(component.joints[1]);
   const offset = toVector(12, angle + 45);
   return vector(component.joints[0]).sumWith(offset).vector;
}
export default makeLayout;