import Component, { Types as ComponentTypes } from "../../+component";
import * as Types from "./types";
import { TrackLayout as Track } from "../_track/~classes";
import drawLarge from "./-drawLarge";
import drawSmall from "./-drawSmall";
import makeTracks from "./-makeTracks";
import { makeGroup } from "../../../svg/element/+group";

export class BreadboardSmall implements Component, Types.breadboard<"layout"> {
   type = "breadboardsmall" as const;
   group = makeGroup();
   form = "layout" as const

   tracks: Track[] = [];



   // Handled in the tracks
   getConnectors(): ComponentTypes.hole[][] { 
      return this.tracks.map((track) => {
         return track.getConnectors()[0]
      })
   }

   flags = {
      order: "back" as const,
      disabled: false
   }

   transferFunction() { return [] };
   properties: Types.properties;
   states: Types.state;
   constructor(properties: Types.properties, states: Types.state) {
      super();
      this.properties = properties;
      this.states = states;
   }

   draw() {
      this.tracks = makeTracks(this, "small");
      //(Prepend so handles appear on top)
      this.group.prepend(drawSmall(this), this.tracks.map(t => t.group));
   }
}

export class BreadboardLarge implements Component, Types.breadboard<"layout"> {
   type = "breadboardlarge" as const;
   group = makeGroup();
   form = "layout" as const

   tracks: Track[] = [];



   // Handled in the tracks
   getConnectors(): ComponentTypes.hole[][] { 
      return this.tracks.map((track) => {
         return track.getConnectors()[0]
      })
   }

   flags = {
      order: "back" as const,
      disabled: false
   }

   transferFunction() { return [] };
   properties: Types.properties;
   states: Types.state;
   constructor(properties: Types.properties, states: Types.state) {
      super();
      this.properties = properties;
      this.states = states;
   }

   draw() {
      this.tracks = makeTracks(this, "large");
      //(Prepend so handles appear on top)
      this.group.prepend(drawLarge(this), this.tracks.map(t => t.group));
   }
}

