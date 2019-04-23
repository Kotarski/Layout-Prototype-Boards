import Component, { Types as ComponentTypes } from "../../+component";
import * as Types from "./types";
import makeConnector from "../../generics/-makeConnector";
import drawLayout from "./-drawLayout";
import drawSchematic from "./-drawSchematic";
import { INDEXEND1, INDEXEND2 } from "./constants";
import { makeGroup } from "../../../svg/element/+group";

abstract class Base {
   type = "resistor" as const;
   group = makeGroup();
   properties: Types.properties;
   states: Types.state;
   constructor(values: Types.values) {
      this.properties = {
         resistance: values.resistance
      }
      this.states = {
         joints: values.joints
      }
   }

   flags = {
      order: "fore" as const,
      disabled: false
   }

   transferFunction() { return [] };
}

export class Schematic extends Base implements Component, Types.resistor<"schematic"> {
   form = "schematic" as const
   draw() {
      //(Prepend so handles appear on top)
      this.group.prepend(drawSchematic(this));
   }
   getConnectors(): ComponentTypes.connector[][] {
      return [
         [makeConnector(this, "", "node", this.states.joints[INDEXEND1]),
         makeConnector(this, "", "node", this.states.joints[INDEXEND2]),]
      ]
   }
}

export class Layout extends Base implements Component, Types.resistor<"layout"> {
   form = "layout" as const
   draw() {
      //(Prepend so handles appear on top)
      this.group.prepend(drawLayout(this));
   }
   getConnectors(): ComponentTypes.connector[][] {
      return [
         [makeConnector(this, "", "pin", this.states.joints[INDEXEND1]),
         makeConnector(this, "", "pin", this.states.joints[INDEXEND2]),]
      ]
   }
   get [Symbol.toStringTag]() {
      return `${this.form}-${this.type}`;
   }
}

