import Component, { Types as ComponentTypes } from "../../+component";
import * as Types from "./types";
import makeConnector from "../../generics/-makeConnector";
import drawLayout from "./-drawLayout";
import drawSchematic from "./-drawSchematic";
import { makeGroup } from "../../../svg/element/+group";

export class PowerSchematic implements Component, Types.power<"schematic"> {
   form = "schematic" as const
   type = "power" as const;
   group = makeGroup();
   properties: Types.properties;
   states: Types.state;
   constructor(properties: Types.properties, states: Types.state) {
      this.properties = properties;
      this.states = states;
   }

   transferFunction() { return [] };
   flags = {
      order: "fore" as const,
      disabled: false
   }

   /** Builds and draws the components connectors */
   getConnectors(): ComponentTypes.connector[][] {
      return [
         [makeConnector(this, "", "node", this.states.joints[0])]
      ]
   }

   draw() {
      //(Prepend so handles appear on top)
      this.group.prepend(drawSchematic(this));
   }
}

export class PowerLayout implements Component, Types.power<"layout"> {
   form = "layout" as const
   type = "power" as const;
   group = makeGroup();
   properties: Types.properties;
   states: Types.state;
   constructor(properties: Types.properties, states: Types.state) {
      this.properties = properties;
      this.states = states;
   }

   transferFunction() { return [] };
   flags = {
      order: "mid" as const,
      disabled: false
   }

   /** Builds and draws the components connectors */
   getConnectors(): ComponentTypes.hole[][] {
      return [[
         makeConnector(this, "", "hole", this.states.joints[0])
      ]]
   }

   draw() {
      //(Prepend so handles appear on top)
      this.group.prepend(drawLayout(this));
   }
}

