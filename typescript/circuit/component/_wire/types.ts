import { Types } from "../../+component";
export { Types as Base };
import { Vector } from "../../../-vector";
import { ComponentForms } from "../@componentBase";
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

export interface wire<form extends ComponentForms> {
   properties: properties,
   states: (
      form extends "schematic" ? stateSchematic :
      form extends "layout" ? stateLayout :
      never
   )
} 

