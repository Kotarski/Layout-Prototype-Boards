import Component, { Types as ComponentTypes } from "../../+component";
import * as Types from "./types";
import vector, { Vector } from "../../../-vector";
import deepCopy from "../../../utility/-deepCopy";
import Insert from "../../../utility/~insert";
import makeConnector from "../../generics/-makeConnector";
import drawLayout from "./-drawLayout";
import { makeGroup } from "../../../svg/element/+group";

export class Layout implements Component, Types.properties, Types.state {
   name = "track" as "track";
   group = makeGroup();
   disabled = false;
   form = "layout" as "layout"
   holeSpacings: number[];
   style: "breadboard" | "stripboard";
   joints: [Vector, Vector];
   breaks: number[];

   constructor(values: Types.properties & Types.state) {
      this.holeSpacings = values.holeSpacings;
      this.style = values.style;
      this.joints = values.joints;
      this.breaks = values.breaks;
   }

   getProperties(): Types.properties {
      return deepCopy({
         name: this.name,
         holeSpacings: this.holeSpacings,
         style: this.style
      });
   }

   getState(): Types.state {
      return deepCopy({
         joints: this.joints,
         disabled: this.disabled,
         breaks: this.breaks
      });
   }


   draw() {
      //(Prepend so handles appear on top)
      this.group.prepend(drawLayout(this));
   }

   /** Builds and draws the components connectors */
   getConnectors(): ComponentTypes.hole[][] {

      const start = this.joints[0];
      const step = this.joints[1];


      let connectorSets: ComponentTypes.hole[][] = [[]];
      // Create the holes
      let accHs = 0;
      this.holeSpacings.forEach((hS, idx) => {
         accHs += hS;

         let holePos = vector(step)
            .scaleWith(accHs)
            .sumWith(start)
            .vector;

         const connectorType = this.breaks.includes(idx) ? "brokenhole" : "hole";
         connectorSets[0].push(
            makeConnector(this, "", connectorType, holePos)
         );
      })

      return connectorSets
   }
   insertInto(element?: SVGGraphicsElement) {
      Insert.last(this.group.element, element);
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

