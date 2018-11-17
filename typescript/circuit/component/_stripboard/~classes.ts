import Component, { Types as ComponentTypes } from "../../+component";
import * as Types from "./types";
import vector, { Vector } from "../../../-vector";
import deepCopy from "../../../utility/-deepCopy";
import Insert from "../../../utility/~insert";
import manifest from "../../manifest";
import getComponentConnections from "../../generics/-getComponentConnections";
import { Layout as Track } from "../_track/~classes";
import makeTracks from "./-make-tracks";

import { gridSpacing } from "../../../~constants";


//TODO MOVE DRAW INTO ITS OWN FILE
import { make as makeRect } from "../../../svg/element/+rect";

export class Layout extends Component implements Types.values {
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

      let rotation = vector(this.joints[0]).getAngleTo(this.joints[1]);
      this.tracks = makeTracks(this)


      const gS = gridSpacing;
      //const centre = { x: (this.columns - 1) * gS / 2, y: (this.rows - 1) * gS / 2 };
      const size = { width: (this.columns + 0.5) * gS, height: (this.rows + 0.5) * gS };
      const cornerRounding = { x: 3, y: 3 };

      this.group.append(
         makeRect(vector(0), size, cornerRounding, "body highlight").translate(this.joints[0]).rotate(rotation),
         this.tracks.map(t => t.group)
      );

   }

   getConnections(): ComponentTypes.connector[][][] {
      return getComponentConnections(this, manifest.layout);
   }

   insertInto(element?: SVGGraphicsElement) {
      Insert.first(this.group.element, element);
   }

   transferFunction() { return [] };
}

