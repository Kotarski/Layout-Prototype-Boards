import { Vector } from "../../../-vector";
import { Types } from "../../+component";
export interface properties extends Types.properties {
   currentGain: number;
   type: "PNP" | "NPN";
}

export interface state extends Types.state {
   joints: [Vector, Vector, Vector];
}

export type values = properties & state;

