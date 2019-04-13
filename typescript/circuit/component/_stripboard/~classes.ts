import Component, { Types as ComponentTypes } from "../../+component";
import * as Types from "./types";
import deepCopy from "../../../utility/-deepCopy";
import { Layout as Track } from "../_track/~classes";
import drawLayout from "./-drawLayout";
import { Vector } from "../../../++types";
import { makeGroup } from "../../../svg/element/+group";

export class StripboardLayout implements Component, Types.values {
   name = "stripboard" as "stripboard";
   group = makeGroup();
   disabled = false;
   form = "layout" as "layout"
   tracks: Track[] = [];
   trackBreaks: Types.trackBreak[];
   rows: number;
   columns: number;
   joints: [Vector, Vector];

   constructor(values: Types.properties & Types.state) {
      this.rows = values.rows;
      this.columns = values.columns;
      this.trackBreaks = values.trackBreaks;
      this.joints = values.joints;
   }

   getProperties(): Types.properties {
      return deepCopy({
         name: this.name,
         rows: this.rows,
         columns: this.columns
      });
   }

   getState(): Types.state {
      return deepCopy({
         joints: this.joints,
         disabled: this.disabled,
         trackBreaks: this.trackBreaks
      });
   }

   getConnectors(): ComponentTypes.hole[][] {
      return this.tracks.map((track) => {
         return track.getConnectors()[0]
      })
   }

   draw() {
      this.group.prepend(drawLayout(this))
   }
   flags = {
      order: "back" as "back"
   }

   transferFunction() { return [] };
}

