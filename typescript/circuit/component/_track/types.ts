import { Types } from "../../+component";
export { Types as Base };
import { Vector } from "../../../-vector";

export interface properties extends Types.properties {
   holeSpacings: number[];
   style: "breadboard" | "stripboard";
}

export interface state extends Types.state {
   joints: [Vector, Vector];
   breaks: number[]
}

export type values = properties & state;



