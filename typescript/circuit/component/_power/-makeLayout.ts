import ValueCheck from "../~valueCheck";
import * as Types from "./types";
import { PowerLayout } from "./~classes";
import getMaker from "../../generics/-getMaker";
import { Vector } from "../../../-vector";
import Graphical from "../addins/graphical";
import Draggable from "../addins/draggable";
import Selectable from "../addins/selectable";
import ConnectionHighlights from "../addins/connectionHighlights";
import WireCreation from "../addins/wireCreation";

const defaulterLayout: ValueCheck.Defaulter<Types.values> = {
   name: ValueCheck.validate("string", "power"),
   disabled: ValueCheck.validate("boolean", false),
   joints: ValueCheck.joints<[Vector]>(
      [{ x: 0, y: 40 }]
   ),
   voltage: ValueCheck.validate("number", 0)
};

const makeLayout = getMaker(PowerLayout, defaulterLayout,
   (component: PowerLayout) => {
      Graphical.init(component);
      Draggable.init(component);
      Selectable.init(component);
      ConnectionHighlights.init(component, true, getHighlightColor(component));
      WireCreation.init(component);
   }
);

function getHighlightColor(component: PowerLayout): string[] {
   return [(component.voltage < 0)
      ? "blue" // negative
      : (component.voltage > 0)
         ? "red" // positive
         : "black" // zero (ground);
   ]
}
export default makeLayout;
