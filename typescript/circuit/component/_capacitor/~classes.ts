import Component, { Types as ComponentTypes } from "../../+component";
import * as Types from "./types";
import { Vector } from "../../../-vector";
import deepCopy from "../../../utility/-deepCopy";
import Insert from "../../../utility/~insert";
import manifest from "../../manifest";
import getComponentConnections from "../../generics/-getComponentConnections";
import makeConnector from "../../generics/-makeConnector";
import { INDEXANODE, INDEXCATHODE } from "./constants";
import drawLayout from "./-drawLayout";
import drawSchematic from "./-drawSchematic";
abstract class Base extends Component implements Types.values {
   capacitance: number;
   isPolarised: boolean;
   joints: [Vector, Vector];

   constructor(values: Types.values) {
      super(values);
      this.joints = values.joints;
      this.capacitance = values.capacitance;
      this.isPolarised = values.isPolarised;
   }

   getProperties(): Types.properties {
      return deepCopy({
         name: this.name,
         capacitance: this.capacitance,
         isPolarised: this.isPolarised
      });
   }

   getState(): Types.state {
      return deepCopy({
         joints: this.joints,
         disabled: this.disabled
      });
   }

   insertInto(element?: SVGGraphicsElement) {
      Insert.last(this.group.element, element);
   }

   transferFunction() { return [] };
}

export class Schematic extends Base {
   draw() {
      //(Prepend so handles appear on top)
      this.group.prepend(drawSchematic(this));
   }

   getConnections(): ComponentTypes.connector[][][] {
      return getComponentConnections(this, manifest.schematic);
   }

   makeConnectors() {
      if (this.isPolarised) {
         this.connectorSets = [[
            makeConnector(this, "cathode", "node", this.joints[INDEXCATHODE], "-"),
            makeConnector(this, "anode", "node", this.joints[INDEXANODE], "+"),
         ]]
      } else {
         this.connectorSets = [[
            makeConnector(this, "", "node", this.joints[INDEXCATHODE]),
            makeConnector(this, "", "node", this.joints[INDEXANODE]),
         ]]
      }
   }
}

export class Layout extends Base {
   draw() {
      //(Prepend so handles appear on top)
      this.group.prepend(drawLayout(this));
   }

   getConnections(): ComponentTypes.connector[][][] {
      return getComponentConnections(this, manifest.layout);
   }

   makeConnectors() {
      if (this.isPolarised) {
         this.connectorSets = [[
            makeConnector(this, "cathode", "pin", this.joints[INDEXCATHODE], "-"),
            makeConnector(this, "anode", "pin", this.joints[INDEXANODE], "+"),
         ]]
      } else {
         this.connectorSets = [[
            makeConnector(this, "", "pin", this.joints[INDEXCATHODE]),
            makeConnector(this, "", "pin", this.joints[INDEXANODE]),
         ]]
      }
   }
}

