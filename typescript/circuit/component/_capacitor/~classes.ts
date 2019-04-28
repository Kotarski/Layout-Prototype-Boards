import Component, { Types as ComponentTypes } from "../../+component";
import * as Types from "./types";
import makeConnector from "../../generics/-makeConnector";
import { INDEXANODE, INDEXCATHODE } from "./constants";
import drawLayout from "./-drawLayout";
import drawSchematic from "./-drawSchematic";
import { makeGroup } from "../../../svg/element/+group";

export class CapacitorSchematic implements Component, Types.capacitor<"schematic"> {
   form = "schematic" as const
   type = "capacitor" as const;
   group = makeGroup();
   properties: Types.properties;
   states: Types.state;
   constructor(properties: Types.properties, states: Types.state) {
      this.properties = properties;
      this.states = states;
   }

   flags = {
      order: "fore" as const,
      disabled: false
   }

   transferFunction() { return [] };
   draw() {
      //(Prepend so handles appear on top)
      this.group.prepend(drawSchematic(this));
   }


   getConnectors(): ComponentTypes.connector[][] {
      if (this.properties.isPolarised) {
         return [[
            makeConnector(this, "cathode", "node", this.states.joints[INDEXCATHODE], "-"),
            makeConnector(this, "anode", "node", this.states.joints[INDEXANODE], "+"),
         ]]
      } else {
         return [[
            makeConnector(this, "", "node", this.states.joints[INDEXCATHODE]),
            makeConnector(this, "", "node", this.states.joints[INDEXANODE]),
         ]]
      }
   }
}

export class CapacitorLayout implements Component, Types.capacitor<"layout"> {
   form = "layout" as const
   type = "capacitor" as const;
   group = makeGroup();
   properties: Types.properties;
   states: Types.state;
   constructor(properties: Types.properties, states: Types.state) {
      this.properties = properties;
      this.states = states;
   }

   flags = {
      order: "fore" as const,
      disabled: false
   }

   transferFunction() { return [] };
   draw() {
      //(Prepend so handles appear on top)
      this.group.prepend(drawLayout(this));
   }


   getConnectors(): ComponentTypes.connector[][] {
      if (this.properties.isPolarised) {
         return [[
            makeConnector(this, "cathode", "pin", this.states.joints[INDEXCATHODE], "-"),
            makeConnector(this, "anode", "pin", this.states.joints[INDEXANODE], "+"),
         ]]
      } else {
         return [[
            makeConnector(this, "", "pin", this.states.joints[INDEXCATHODE]),
            makeConnector(this, "", "pin", this.states.joints[INDEXANODE]),
         ]]
      }
   }
}

