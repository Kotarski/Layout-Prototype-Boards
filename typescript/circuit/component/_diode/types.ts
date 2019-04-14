import { Types } from "../../+component";
export { Types as Base };
import { Vector } from "../../../-vector";
import { ComponentForms } from "../@componentBase";
export interface properties extends Types.properties {
   breakdownVoltage: number;
   saturationCurrent: number;
   color: string;
}

export interface state extends Types.state {
   joints: [Vector, Vector];
}

export type values = properties & state;

export interface diode<form extends ComponentForms> {
   properties: properties,
   states: (
      form extends "schematic" ? state :
      form extends "layout" ? state :
      never
   )
} 


