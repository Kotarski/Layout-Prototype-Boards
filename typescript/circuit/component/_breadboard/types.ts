import { Types } from "../../+component";
export { Types as Base };
import { Vector } from "../../../-vector";
import { ComponentForms } from "../@componentBase";
import { TrackLayout } from "../_track/~classes";
export interface properties extends Types.properties {

}

export interface state extends Types.state {
   joints: [Vector, Vector];
}

export type values = properties & state;

export interface breadboard<form extends ComponentForms & "layout"> {
   properties: properties,
   states: (
      form extends "layout" ? state :
      never
   ),
   tracks: TrackLayout[]
} 


