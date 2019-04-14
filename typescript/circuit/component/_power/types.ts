import { Types } from "../../+component";
export { Types as Base };
import { Vector } from "../../../-vector";
import { ComponentForms } from "../@componentBase";

export interface properties extends Types.properties {
   voltage: number;
}

export interface state extends Types.state {
   joints: [Vector];
}


export type values = properties & state;


export interface power<form extends ComponentForms> {
   properties: properties,
   states: (
      form extends "schematic" ? state :
      form extends "layout" ? state :
      never
   )
} 


