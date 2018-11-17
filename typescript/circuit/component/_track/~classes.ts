import Component, { Types as ComponentTypes } from "../../+component";
import * as Types from "./types";
import vector, { Vector } from "../../../-vector";
import deepCopy from "../../../utility/-deepCopy";
import Insert from "../../../utility/~insert";
import manifest from "../../manifest";
import getComponentConnections from "../../generics/-getComponentConnections";
import makeConnector from "../../generics/-makeConnector";
import drawLayout from "./-drawLayout";

export class Layout extends Component implements Types.properties, Types.state {
   name: string;
   holeSpacings: number[];
   connectorSets: ComponentTypes.hole[][] = [];
   style: "breadboard" | "stripboard";
   joints: [Vector, Vector];

   constructor(values: Types.properties & Types.state) {
      super(values);
      this.name = values.name;
      this.holeSpacings = values.holeSpacings;
      this.style = values.style;
      this.joints = values.joints;
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
         disabled: this.disabled
      });
   }


   draw() {
      //(Prepend so handles appear on top)
      this.group.prepend(drawLayout(this));
   }

   /** Builds and draws the components connectors */
   makeConnectors() {

      const start = this.joints[0];
      const step = this.joints[1];


      this.connectorSets = [[]];
      // Create the holes
      let accHs = 0;
      this.holeSpacings.forEach((hS) => {
         accHs += hS;

         let holePos = vector(step)
            .scaleWith(accHs)
            .sumWith(start)
            .vector;

         this.connectorSets[0].push(
            makeConnector(this, "", "hole", holePos)
         );
      })
   }

   getConnections(): ComponentTypes.connector[][][] {
      return getComponentConnections(this, manifest.layout);
   }

   insertInto(element?: SVGGraphicsElement) {
      Insert.last(this.group.element, element);
   }

   /** ...
   */
   transferFunction(from: ComponentTypes.hole): ComponentTypes.connector[] {
      let fromIdx = this.connectorSets[0].indexOf(from);
      let connected: ComponentTypes.connector[] = [];
      for (let i = fromIdx + 1; i < this.connectorSets[0].length; i++) {
         if (this.connectorSets[0][i].type === "brokenhole") break;
         connected.push(this.connectorSets[0][i]);
      }
      for (let i = fromIdx - 1; i >= 0; i--) {
         if (this.connectorSets[0][i].type === "brokenhole") break;
         connected.push(this.connectorSets[0][i]);
      }

      return connected;
   }

}

