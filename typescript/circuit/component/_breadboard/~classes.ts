import Component, { Types as ComponentTypes } from "../../+component";
import * as Types from "./types";
import { Vector } from "../../../-vector";
import deepCopy from "../../../utility/-deepCopy";
import Insert from "../../../utility/~insert";
import manifest from "../../manifest";
import getComponentConnections from "../../generics/-getComponentConnections";
import { Layout as Track } from "../_track/~classes";
import drawLarge from "./-drawLarge";
import drawSmall from "./-drawSmall";
import makeTracks from "./-makeTracks";

abstract class Base extends Component implements Types.values {
   joints: [Vector, Vector];
   tracks: Track[] = [];
   connectorSets: ComponentTypes.hole[][] = [];

   constructor(values: Types.values) {
      super(values);
      this.joints = values.joints
   }

   getProperties(): Types.properties {
      return deepCopy({
         name: this.name,
      });
   }

   getState(): Types.state {
      return deepCopy({
         joints: this.joints,
         disabled: this.disabled
      });
   }

   // Handled in the tracks
   makeConnectors() { }

   insertInto(element?: SVGGraphicsElement) {
      Insert.first(this.group.element, element);
   }

   transferFunction() { return [] };

   getConnections(): ComponentTypes.connector[][][] {
      return getComponentConnections(this, manifest.layout);
   }
}

export class Small extends Base {
   draw() {
      this.tracks = makeTracks(this, "small");
      //(Prepend so handles appear on top)
      this.group.prepend(drawSmall(this), this.tracks.map(t => t.group));
   }
}

export class Large extends Base {
   draw() {
      this.tracks = makeTracks(this, "large");
      //(Prepend so handles appear on top)
      this.group.prepend(drawLarge(this), this.tracks.map(t => t.group));
   }
}

