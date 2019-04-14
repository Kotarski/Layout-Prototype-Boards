import { Vector } from "../../../-vector";
import { Types } from "../../+component";
import { ComponentForms } from "../@componentBase";
export { Types as Base };
export interface properties extends Types.properties {
   currentGain: number;
   type: "PNP" | "NPN";
}

export interface state extends Types.state {
   joints: [Vector, Vector, Vector];
}

export type values = properties & state;


export interface bipolar<form extends ComponentForms> {
   properties: properties,
   states: (
      form extends "schematic" ? state :
      form extends "layout" ? state :
      never
   )
} 
