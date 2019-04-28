import ValueCheck from "../~valueCheck";
import * as Types from "./types";
import { TrackLayout } from "./~classes";
import getMaker from "../../generics/-getMaker";
import { Vector } from "../../../-vector";
import Graphical from "../addins/graphical";
import { ComponentDefaulter } from "../@component";


const defaulter: ComponentDefaulter<Types.track<"layout">> = {
   properties: {
      style: ValueCheck.validate<"breadboard" | "stripboard">(["breadboard", "stripboard"], "breadboard"),
      holeSpacings: ValueCheck.validate(
         v => Array.isArray(v) && v.every(ValueCheck.test("number")), [0]
      ),
      rows: ValueCheck.integer(1),
      columns: ValueCheck.integer(1)
   },
   states: {
      joints: ValueCheck.joints<[Vector, Vector]>(
         [{ x: 0, y: 0 }, { x: 20, y: 0 }]
      ),
      breaks: ValueCheck.validate(
         v => Array.isArray(v) && v.every(ValueCheck.test("number")), []
      )   
   }
};

const makeLayout = getMaker<TrackLayout>(TrackLayout, defaulter,
   Graphical
);
export default makeLayout;


