import Component, { Types as ComponentTypes } from "../../+component";
import * as Types from "./types";
import { Vector } from "../../../-vector";
import deepCopy from "../../../utility/-deepCopy";
import makeConnector from "../../generics/-makeConnector";
import drawLayout from "./-drawLayout";
import drawSchematic from "./-drawSchematic";
import { INDEXEND1, INDEXEND2 } from "./constants";
import { makeGroup } from "../../../svg/element/+group";
abstract class Base implements Types.values {
   name = "inductor" as "inductor";
   group = makeGroup();
   disabled = false;
   inductance: number;
   joints: [Vector, Vector];

   constructor(values: Types.values) {
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

   flags = {
      order: "fore" as "fore"
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
         makeConnector(this, "", "node", this.joints[INDEXEND1]),
         makeConnector(this, "", "node", this.joints[INDEXEND2]),
      ]]
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
         makeConnector(this, "", "pin", this.joints[INDEXEND1]),
         makeConnector(this, "", "pin", this.joints[INDEXEND2]),
      ]]
   }

}

