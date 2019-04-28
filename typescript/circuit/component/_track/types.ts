import { Types } from "../../+component";
export { Types as Base };
import { Vector } from "../../../-vector";
import { ComponentForms } from "../@componentBase";

export interface properties extends Types.properties {
   holeSpacings: number[];
   style: "breadboard" | "stripboard";
   rows: number,
   columns: number
}

export interface state extends Types.state {
   joints: [Vector, Vector];
   breaks: number[]
}

export type values = properties & state;


export interface track<form extends ComponentForms & "layout"> {
   properties: properties,
   states: (
      form extends "layout" ? state :
      never
   )
} 


