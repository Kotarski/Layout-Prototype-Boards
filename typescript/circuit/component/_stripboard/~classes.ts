import Component, { Types as ComponentTypes } from "../../+component";
import * as Types from "./types";
import { Layout as Track } from "../_track/~classes";
import drawLayout from "./-drawLayout";
import { makeGroup } from "../../../svg/element/+group";

export class StripboardLayout implements Component, Types.stripboard<"layout"> {
   type = "stripboard" as "stripboard";
   group = makeGroup();
   form = "layout" as "layout"
   tracks: Track[] = [];
   properties: Types.properties;
   states: Types.state;
   constructor(values: Types.properties & Types.state) {
      this.properties = {
         rows: values.rows,
         columns: values.columns
      }
      this.states = {
         joints: values.joints,
         trackBreaks: values.trackBreaks
      }
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
      order: "back" as "back",
      disabled: false
   }

   transferFunction() { return [] };
}

