import Component, { Types as ComponentTypes } from "../../+component";
import * as Types from "./types";
import vector from "../../../-vector";
import makeConnector from "../../generics/-makeConnector";
import drawLayout from "./-drawLayout";
import { makeGroup } from "../../../svg/element/+group";

export class TrackLayout implements Component, Types.track<"layout"> {
   type = "track" as const;
   group = makeGroup();
   form = "layout" as const
   properties: Types.properties;
   states: Types.state;
   constructor(properties: Types.properties, states: Types.state) {
      this.properties = properties;
      this.states = states;
   }
   draw() {
      //(Prepend so handles appear on top)
      this.group.prepend(drawLayout(this));
   }

   /** Builds and draws the components connectors */
   getConnectors(): ComponentTypes.hole[][] {

      const start = this.states.joints[0];
      const step = this.states.joints[1];


      let connectorSets: ComponentTypes.hole[][] = [[]];
      // Create the holes
      let accHs = 0;
      this.properties.holeSpacings.forEach((hS, idx) => {
         accHs += hS;

         let holePos = vector(step)
            .scaleWith(accHs)
            .sumWith(start)
            .vector;

         const connectorType = this.states.breaks.includes(idx) ? "brokenhole" : "hole";
         connectorSets[0].push(
            makeConnector(this, "", connectorType, holePos)
         );
      })

      return connectorSets
   }
   flags = {
      order: "fore" as const,
      disabled: false
   }

   /** ...
   */
   transferFunction(from: ComponentTypes.hole): ComponentTypes.connector[] {
      let connectors = this.getConnectors();
      let fromIdx = connectors[0].findIndex((c)=>vector(c.point).isCloseTo(from.point))
      let connected: ComponentTypes.connector[] = [];
      for (let i = fromIdx + 1; i < connectors[0].length; i++) {
         if (connectors[0][i].type === "brokenhole") break;
         connected.push(connectors[0][i]);
      }
      for (let i = fromIdx - 1; i >= 0; i--) {
         if (connectors[0][i].type === "brokenhole") break;
         connected.push(connectors[0][i]);
      }

      return connected;
   }

}

