import Component, { Types as ComponentTypes } from "../../+component";
import * as Types from "./types";
import { Vector } from "../../../-vector";
import deepCopy from "../../../utility/-deepCopy";
import Insert from "../../../utility/~insert";
import manifest from "../../manifest";
import getComponentConnections from "../../generics/-getComponentConnections";
import makeConnector from "../../generics/-makeConnector";
import drawLayout from "./-drawLayout";
import drawSchematic from "./-drawSchematic";
import { INDEXANODE, INDEXCATHODE } from "./constants";
abstract class Base extends Component implements Types.values {
   breakdownVoltage: number;
   saturationCurrent: number;
   joints: [Vector, Vector];
   color: string;

   constructor(values: Types.values) {
      super(values);
      this.joints = values.joints;
      this.saturationCurrent = values.saturationCurrent;
      this.breakdownVoltage = values.breakdownVoltage;
      this.color = values.color;
   }

   getProperties(): Types.properties {
      return deepCopy({
         name: this.name,
         breakdownVoltage: this.breakdownVoltage,
         saturationCurrent: this.saturationCurrent,
         color: this.color
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
      this.connectorSets = [[
         makeConnector(this, "anode", "node", this.joints[INDEXANODE], "+"),
         makeConnector(this, "cathode", "node", this.joints[INDEXCATHODE], "-"),
      ]];
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
      this.connectorSets = [[
         makeConnector(this, "anode", "pin", this.joints[INDEXANODE], "+"),
         makeConnector(this, "cathode", "pin", this.joints[INDEXCATHODE], "-"),
      ]];
   }
}

