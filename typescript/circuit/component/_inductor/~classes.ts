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
import { INDEXEND1, INDEXEND2 } from "./constants";
abstract class Base extends Component implements Types.values {
   inductance: number;
   joints: [Vector, Vector];

   constructor(values: Types.values) {
      super(values);
      this.joints = values.joints;
      this.inductance = values.inductance;
   }

   getProperties(): Types.properties {
      return deepCopy({
         name: this.name,
         inductance: this.inductance,
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
         makeConnector(this, "", "node", this.joints[INDEXEND1]),
         makeConnector(this, "", "node", this.joints[INDEXEND2]),
      ]]
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
         makeConnector(this, "", "pin", this.joints[INDEXEND1]),
         makeConnector(this, "", "pin", this.joints[INDEXEND2]),
      ]]
   }

}

