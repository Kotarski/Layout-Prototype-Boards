import { Types } from "../../+component";
import { Vector } from "../../../-vector";
export interface properties extends Types.properties {
   inductance: number;
}

export interface state extends Types.state {
   joints: [Vector, Vector];
}

export type values = properties & state;



