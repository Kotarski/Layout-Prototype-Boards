import Component, { Types as ComponentTypes } from "../../+component";
import * as Types from "./types";
import { Vector } from "../../../-vector";
import deepCopy from "../../../utility/-deepCopy";
import makeConnector from "../../generics/-makeConnector";
import drawLayout from "./-drawLayout";
import drawSchematic from "./-drawSchematic";
import { makeGroup } from "../../../svg/element/+group";
abstract class PowerBase implements Types.values {
   name = "power" as "power";
   group = makeGroup();
   disabled = false;
   voltage: number;
   joints: [Vector];

   constructor(values: Types.values) {
      this.voltage = values.voltage;
      this.joints = values.joints;
   }

   getProperties(): Types.properties {
      return deepCopy({
         name: this.name,
         voltage: this.voltage
      });
   }

   getState(): Types.state {
      return deepCopy({
         joints: this.joints,
         disabled: this.disabled
      });
   }

   transferFunction() { return [] };
}

export class PowerSchematic extends PowerBase implements Component {
   form = "schematic" as "schematic"
   flags = {
      order: "fore" as "fore"
   }

   /** Builds and draws the components connectors */
   getConnectors(): ComponentTypes.connector[][] {
      return [
         [makeConnector(this, "", "node", this.joints[0])]
      ]
   }

   draw() {
      //(Prepend so handles appear on top)
      this.group.prepend(drawSchematic(this));
   }
}

export class PowerLayout extends PowerBase implements Component {
   form = "layout" as "layout"
   flags = {
      order: "mid" as "mid"
   }

   /** Builds and draws the components connectors */
   getConnectors(): ComponentTypes.hole[][] {
      return [[
         makeConnector(this, "", "hole", this.joints[0])
      ]]
   }

   draw() {
      //(Prepend so handles appear on top)
      this.group.prepend(drawLayout(this));
   }
}

