import { Types } from "../../+component";
export { Types as Base };
import { Vector } from "../../../-vector";
import { ComponentForms } from "../@componentBase";
export interface trackBreak { track: number, hole: number }

export interface properties extends Types.properties {
   rows: number;
   columns: number;
}
export interface state extends Types.state {
   joints: [Vector, Vector];
   trackBreaks: trackBreak[];
}

export type values = properties & state

export interface stripboard<form extends ComponentForms> {
   properties: properties,
   states: (
      form extends "layout" ? state :
      never
   )
} 
