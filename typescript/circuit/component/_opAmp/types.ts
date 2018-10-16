import { Types } from "../../+component";
import { Vector } from "../../../-vector";
export interface properties extends Types.properties {
   offsetVoltage: number;
}

export interface stateSchematic extends Types.state {
   joints: [Vector, Vector, Vector, Vector, Vector];
}

export interface stateLayout extends Types.state {
   isDual: boolean;
   joints: [Vector, Vector];
}

export type valuesSchematic = properties & stateSchematic;
export type valuesLayout = properties & stateLayout;



