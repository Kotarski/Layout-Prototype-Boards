import { Types } from "../../+component";
export { Types as Base };
import { Vector } from "../../../-vector";
export interface trackBreak { track: number, hole: number }

export interface properties extends Types.properties {
   rows: number;
   columns: number;
}
export interface state extends Types.state {
   joints: [Vector, Vector];
   trackBreaks: trackBreak[];
}

export type values = properties & state
