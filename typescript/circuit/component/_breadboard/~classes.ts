import Component, { Types as ComponentTypes } from "../../+component";
import * as Types from "./types";
import { Layout as Track } from "../_track/~classes";
import drawLarge from "./-drawLarge";
import drawSmall from "./-drawSmall";
import makeTracks from "./-makeTracks";
import { makeGroup } from "../../../svg/element/+group";

abstract class Base {
   group = makeGroup();
   form = "layout" as "layout"

   tracks: Track[] = [];



   // Handled in the tracks
   getConnectors(): ComponentTypes.hole[][] { 
      return this.tracks.map((track) => {
         return track.getConnectors()[0]
      })
   }

   flags = {
      order: "back" as "back",
      disabled: false
   }

   transferFunction() { return [] };
}

export class Small extends Base implements Component, Types.breadboard<"layout"> {
   type = "breadboardsmall" as "breadboardsmall";
   properties: Types.properties;
   states: Types.state;
   constructor(values: Types.values) {
      super();
      this.properties = {}
      this.states = {
         joints: values.joints
      }
   }

   draw() {
      this.tracks = makeTracks(this, "small");
      //(Prepend so handles appear on top)
      this.group.prepend(drawSmall(this), this.tracks.map(t => t.group));
   }
}

export class Large extends Base implements Component, Types.breadboard<"layout"> {
   type = "breadboardlarge" as "breadboardlarge";
   properties: Types.properties;
   states: Types.state;
   constructor(values: Types.values) {
      super();
      this.properties = {}
      this.states = {
         joints: values.joints
      }
   }

   draw() {
      this.tracks = makeTracks(this, "large");
      //(Prepend so handles appear on top)
      this.group.prepend(drawLarge(this), this.tracks.map(t => t.group));
   }
}

