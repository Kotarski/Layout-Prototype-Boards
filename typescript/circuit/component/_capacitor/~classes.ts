import Component, { Types as ComponentTypes } from "../../+component";
import * as Types from "./types";
import { Vector } from "../../../-vector";
import deepCopy from "../../../utility/-deepCopy";
import Insert from "../../../utility/~insert";
import makeConnector from "../../generics/-makeConnector";
import { INDEXANODE, INDEXCATHODE } from "./constants";
import drawLayout from "./-drawLayout";
import drawSchematic from "./-drawSchematic";
import { makeGroup } from "../../../svg/element/+group";
abstract class Base implements Types.values {
   name = "capacitor" as "capacitor";
   group = makeGroup();
   disabled = false;
   capacitance: number;
   isPolarised: boolean;
   joints: [Vector, Vector];

   constructor(values: Types.values) {
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

export class Schematic extends Base implements Component {
   form = "schematic" as "schematic"
   draw() {
      //(Prepend so handles appear on top)
      this.group.prepend(drawSchematic(this));
   }


   getConnectors(): ComponentTypes.connector[][] {
      if (this.isPolarised) {
         return [[
            makeConnector(this, "cathode", "node", this.joints[INDEXCATHODE], "-"),
            makeConnector(this, "anode", "node", this.joints[INDEXANODE], "+"),
         ]]
      } else {
         return [[
            makeConnector(this, "", "node", this.joints[INDEXCATHODE]),
            makeConnector(this, "", "node", this.joints[INDEXANODE]),
         ]]
      }
   }
}

export class Layout extends Base implements Component {
   form = "layout" as "layout"
   draw() {
      //(Prepend so handles appear on top)
      this.group.prepend(drawLayout(this));
   }


   getConnectors(): ComponentTypes.connector[][] {
      if (this.isPolarised) {
         return [[
            makeConnector(this, "cathode", "pin", this.joints[INDEXCATHODE], "-"),
            makeConnector(this, "anode", "pin", this.joints[INDEXANODE], "+"),
         ]]
      } else {
         return [[
            makeConnector(this, "", "pin", this.joints[INDEXCATHODE]),
            makeConnector(this, "", "pin", this.joints[INDEXANODE]),
         ]]
      }
   }
}

