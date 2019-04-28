import Component, { Types as ComponentTypes } from "../../+component";
import * as Types from "./types";
import { TrackLayout as Track } from "../_track/~classes";
import drawLayout from "./-drawLayout";
import { makeGroup } from "../../../svg/element/+group";

export class StripboardLayout implements Component, Types.stripboard<"layout"> {
   type = "stripboard" as const;
   group = makeGroup();
   form = "layout" as const
   tracks: Track[] = [];
   properties: Types.properties;
   states: Types.state;
   constructor(properties: Types.properties, states: Types.state) {
      this.properties = properties
      this.states = states
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
      order: "back" as const,
      disabled: false
   }

   transferFunction() { return [] };
}

