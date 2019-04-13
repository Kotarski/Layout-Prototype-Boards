import Component, { Types as ComponentTypes } from "../../+component";
import * as Types from "./types";
import { Vector } from "../../../-vector";
import deepCopy from "../../../utility/-deepCopy";
import { Layout as Track } from "../_track/~classes";
import drawLarge from "./-drawLarge";
import drawSmall from "./-drawSmall";
import makeTracks from "./-makeTracks";
import { makeGroup } from "../../../svg/element/+group";

abstract class Base {
   group = makeGroup();
   disabled = false;
   form = "layout" as "layout"
   joints: [Vector, Vector];
   tracks: Track[] = [];

   constructor(values: Types.values) {
      this.joints = values.joints
   }



   getState(): Types.state {
      return deepCopy({
         joints: this.joints,
         disabled: this.disabled
      });
   }

   // Handled in the tracks
   getConnectors(): ComponentTypes.hole[][] { 
      return this.tracks.map((track) => {
         return track.getConnectors()[0]
      })
   }

   flags = {
      order: "back" as "back"
   }

   transferFunction() { return [] };
}

export class Small extends Base implements Component, Types.values {
   name = "breadboardsmall" as "breadboardsmall";
   draw() {
      this.tracks = makeTracks(this, "small");
      //(Prepend so handles appear on top)
      this.group.prepend(drawSmall(this), this.tracks.map(t => t.group));
   }

   getProperties(): Types.properties {
      return deepCopy({
         name: this.name,
      });
   }
}

export class Large extends Base implements Component, Types.values {
   name = "breadboardlarge" as "breadboardlarge";
   draw() {
      this.tracks = makeTracks(this, "large");
      //(Prepend so handles appear on top)
      this.group.prepend(drawLarge(this), this.tracks.map(t => t.group));
   }

   getProperties(): Types.properties {
      return deepCopy({
         name: this.name,
      });
   }

}

