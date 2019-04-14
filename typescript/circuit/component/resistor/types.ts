import { Types } from "../../+component";
export { Types as Base };
import { Vector } from "../../../-vector";
import { ComponentForms } from "../@componentBase";

export interface properties extends Types.properties {
   resistance: number;
}

export interface state extends Types.state {
   joints: [Vector, Vector];
}

export type values = properties & state;

export interface resistor<form extends ComponentForms> {
   properties: properties,
   states: (
      form extends "schematic" ? state :
      form extends "layout" ? state :
      never
   )
} 
