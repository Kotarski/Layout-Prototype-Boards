import Component, { Types as ComponentTypes } from "../../+component";
import * as Types from "./types";
import deepCopy from "../../../utility/-deepCopy";
import Insert from "../../../utility/~insert";
import manifest from "../../manifest";
import getComponentConnections from "../../generics/-getComponentConnections";
import { Layout as Track } from "../_track/~classes";
import drawLayout from "./-drawLayout";
import { Vector } from "../../../++types";

export class StripboardLayout extends Component implements Types.values {
   tracks: Track[] = [];
   connectorSets: ComponentTypes.hole[][] = [];
   trackBreaks: Types.trackBreak[];
   rows: number;
   columns: number;
   joints: [Vector, Vector];

   constructor(values: Types.properties & Types.state) {
      super(values);
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

   makeConnectors() {
      this.tracks.forEach(track => track.makeConnectors());
      this.tracks.forEach((track, trackIdx) => {
         let trackBreaks = this.trackBreaks.filter(trackBreak => trackBreak.track === trackIdx);
         track.connectorSets[0].forEach((hole, holeIdx) => {
            if (trackBreaks.some(trackBreak => trackBreak.hole === holeIdx)) {
               hole.type = "brokenhole";
            }
         });
      })
   }

   draw() {
      this.group.prepend(drawLayout(this))
   }

   getConnections(): ComponentTypes.connector[][][] {
      return getComponentConnections(this, manifest.layout);
   }

   insertInto(element?: SVGGraphicsElement) {
      Insert.first(this.group.element, element);
   }

   transferFunction() { return [] };
}

