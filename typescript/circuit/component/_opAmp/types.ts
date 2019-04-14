import { Types } from "../../+component";
export { Types as Base };
import { Vector } from "../../../-vector";
import { ComponentForms } from "../@componentBase";
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

export interface opamp<form extends ComponentForms> {
   properties: properties,
   states: (
      form extends "schematic" ? stateSchematic :
      form extends "layout" ? stateLayout :
      never
   )
} 



