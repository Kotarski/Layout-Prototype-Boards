import Component, { Types as ComponentTypes } from "../../+component";
import * as Types from "./types";
import makeConnector from "../../generics/-makeConnector";
import drawLayout from "./-drawLayout";
import drawSchematic from "./-drawSchematic";
import { INDEXANODE, INDEXCATHODE } from "./constants";
import { makeGroup } from "../../../svg/element/+group";
abstract class Base {
   type = "diode" as const;
   group = makeGroup();
   properties: Types.properties;
   states: Types.state;
   constructor(values: Types.values) {
      this.properties = {
         saturationCurrent: values.saturationCurrent,
         breakdownVoltage: values.breakdownVoltage,
         color: values.color
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

export class Schematic extends Base implements Component, Types.diode<"schematic"> {
   form = "schematic" as const
   draw() {
      //(Prepend so handles appear on top)
      this.group.prepend(drawSchematic(this));
   }
   getConnectors(): ComponentTypes.connector[][] {
      return [[
         makeConnector(this, "anode", "node", this.states.joints[INDEXANODE], "+"),
         makeConnector(this, "cathode", "node", this.states.joints[INDEXCATHODE], "-"),
      ]];
   }
}

export class Layout extends Base implements Component, Types.diode<"layout"> {
   form = "layout" as const
   draw() {
      //(Prepend so handles appear on top)
      this.group.prepend(drawLayout(this));
   }
   getConnectors(): ComponentTypes.connector[][] {
      return [[
         makeConnector(this, "anode", "pin", this.states.joints[INDEXANODE], "+"),
         makeConnector(this, "cathode", "pin", this.states.joints[INDEXCATHODE], "-"),
      ]];
   }
}

