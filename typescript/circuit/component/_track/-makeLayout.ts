import ValueCheck from "../~valueCheck";
import * as Types from "./types";
import { Layout } from "./~classes";
import getMaker from "../../generics/-getMaker";
import { Vector } from "../../../-vector";
import Graphical from "../addins/graphical";


const defaulter: ValueCheck.Defaulter<Types.values> = {
   name: ValueCheck.validate("string", "track"),
   style: ValueCheck.validate<"breadboard" | "stripboard">(["breadboard", "stripboard"], "breadboard"),
   disabled: ValueCheck.validate("boolean", false),
   joints: ValueCheck.joints<[Vector, Vector]>(
      [{ x: 0, y: 0 }, { x: 20, y: 0 }]
   ),
   holeSpacings: ValueCheck.validate(
      v => Array.isArray(v) && v.every(ValueCheck.test("number")), [0]
   ),
};

const makeLayout = getMaker(Layout, defaulter,
   (component: Layout) => {
      Graphical.init(component);
   }
);
export default makeLayout;
