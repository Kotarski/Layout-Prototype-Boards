import { Types } from "../../+component";
import { Vector } from "../../../-vector";
export interface properties extends Types.properties { }

export interface stateSchematic extends Types.state {
   joints: Vector[];
}

export interface stateLayout extends Types.state {
   joints: Vector[];
   color: string;
}

export type valuesSchematic = properties & stateSchematic;
export type valuesLayout = properties & stateLayout;



