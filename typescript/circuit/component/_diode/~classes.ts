import Component, { Types as ComponentTypes } from "../../+component";
import * as Types from "./types";
import { Vector } from "../../../-vector";
import deepCopy from "../../../utility/-deepCopy";
import Insert from "../../../utility/~insert";
import makeConnector from "../../generics/-makeConnector";
import drawLayout from "./-drawLayout";
import drawSchematic from "./-drawSchematic";
import { INDEXANODE, INDEXCATHODE } from "./constants";
import { makeGroup } from "../../../svg/element/+group";
abstract class Base implements Types.values {
   name = "diode" as "diode";
   group = makeGroup();
   disabled = false;
   breakdownVoltage: number;
   saturationCurrent: number;
   joints: [Vector, Vector];
   color: string;

   constructor(values: Types.values) {
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

export class Schematic extends Base implements Component {
   form = "schematic" as "schematic"
   draw() {
      //(Prepend so handles appear on top)
      this.group.prepend(drawSchematic(this));
   }
   getConnectors(): ComponentTypes.connector[][] {
      return [[
         makeConnector(this, "anode", "node", this.joints[INDEXANODE], "+"),
         makeConnector(this, "cathode", "node", this.joints[INDEXCATHODE], "-"),
      ]];
   }
}

export class Layout extends Base implements Component {
   form = "layout" as "layout"
   draw() {
      //(Prepend so handles appear on top)
      this.group.prepend(drawLayout(this));
   }
   getConnectors(): ComponentTypes.connector[][] {
      return [[
         makeConnector(this, "anode", "pin", this.joints[INDEXANODE], "+"),
         makeConnector(this, "cathode", "pin", this.joints[INDEXCATHODE], "-"),
      ]];
   }
}

