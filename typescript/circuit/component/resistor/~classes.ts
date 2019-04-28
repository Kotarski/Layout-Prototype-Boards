import Component, { Types as ComponentTypes } from "../../+component";
import * as Types from "./types";
import makeConnector from "../../generics/-makeConnector";
import drawLayout from "./-drawLayout";
import drawSchematic from "./-drawSchematic";
import { INDEXEND1, INDEXEND2 } from "./constants";
import { makeGroup } from "../../../svg/element/+group";

export class ResistorSchematic implements Component, Types.resistor<"schematic"> {
   form = "schematic" as const;
   type = "resistor" as const;
   flags = {
      order: "fore" as const,
      disabled: false
   }
   group = makeGroup();
   properties: Types.properties;
   states: Types.state;
   constructor(properties: Types.properties, states: Types.state) {
      this.properties = properties;
      this.states = states;
   }
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
   transferFunction() { return [] };
}

export class ResistorLayout implements Component, Types.resistor<"layout"> {
   form = "layout" as const;
   type = "resistor" as const;
   flags = {
      order: "fore" as const,
      disabled: false
   }
   group = makeGroup();
   properties: Types.properties;
   states: Types.state;
   constructor(properties: Types.properties, states: Types.state) {
      this.properties = properties;
      this.states = states;
   }
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
   transferFunction() { return [] };
   get [Symbol.toStringTag]() {
      return `${this.form}-${this.type}`;
   }
}

