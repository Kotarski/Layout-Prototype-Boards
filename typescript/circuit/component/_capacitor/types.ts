import { Types } from "../../+component";
export { Types as Base };
import { Vector } from "../../../-vector";
export interface properties extends Types.properties {
   capacitance: number;
   isPolarised: boolean
}

export interface state extends Types.state {
   joints: [Vector, Vector];
}

export type values = properties & state;


