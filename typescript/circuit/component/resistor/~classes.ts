import Component, { Types as ComponentTypes } from "../../+component";
import * as Types from "./types";
import { Vector } from "../../../-vector";
import deepCopy from "../../../utility/-deepCopy";
import Insert from "../../../utility/~insert";
import makeConnector from "../../generics/-makeConnector";
import drawLayout from "./-drawLayout";
import drawSchematic from "./-drawSchematic";
import { INDEXEND1, INDEXEND2 } from "./constants";
import { makeGroup } from "../../../svg/element/+group";

abstract class Base implements Types.values {
   name = "resistor" as "resistor";
   group = makeGroup();
   disabled = false;
   resistance: number;
   joints: [Vector, Vector];

   constructor(values: Types.values) {
      this.joints = values.joints;
      this.resistance = values.resistance;
   }

   getProperties(): Types.properties {
      return deepCopy({
         name: this.name,
         resistance: this.resistance
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
      return [
         [makeConnector(this, "", "node", this.joints[INDEXEND1]),
         makeConnector(this, "", "node", this.joints[INDEXEND2]),]
      ]
   }
}

export class Layout extends Base implements Component {
   form = "layout" as "layout"
   draw() {
      //(Prepend so handles appear on top)
      this.group.prepend(drawLayout(this));
   }
   getConnectors(): ComponentTypes.connector[][] {
      return [
         [makeConnector(this, "", "pin", this.joints[INDEXEND1]),
         makeConnector(this, "", "pin", this.joints[INDEXEND2]),]
      ]
   }
}

