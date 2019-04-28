import Component, { Types as ComponentTypes } from "../../+component";;
import * as Types from "./types";
import { INDEXBASE, INDEXCOLLECTOR, INDEXEMITTER } from "./constants";
import makeConnector from "../../generics/-makeConnector";
import drawLayout from "./-drawLayout";
import drawSchematic from "./-drawSchematic";
import { makeGroup } from "../../../svg/element/+group";

export class BipolarSchematic implements Component, Types.bipolar<"schematic"> {
   form = "schematic" as const
   type = "bipolar" as const;
   group = makeGroup();
   properties: Types.properties;
   states: Types.state;
   constructor(properties: Types.properties, states: Types.state) {
      $(this.group.element).addClass("component " + this.type);
      this.properties = properties;
      this.states = states;
   }

   flags = {
      order: "fore" as const,
      disabled: false
   }
   draw() {
      //(Prepend so handles appear on top)
      this.group.prepend(drawSchematic(this));
   }
   getConnectors(): ComponentTypes.connector[][] {
      return [[
         makeConnector(this, "emitter", "node", this.states.joints[INDEXEMITTER], "e"),
         makeConnector(this, "collector", "node", this.states.joints[INDEXCOLLECTOR], "c"),
         makeConnector(this, "base", "node", this.states.joints[INDEXBASE], "b")
      ]];
   }
   transferFunction() { return [] };
}

export class BipolarLayout implements Component, Types.bipolar<"layout"> {
   form = "layout" as const
   type = "bipolar" as const;
   group = makeGroup();
   properties: Types.properties;
   states: Types.state;
   constructor(properties: Types.properties, states: Types.state) {
      $(this.group.element).addClass("component " + this.type);
      this.properties = properties;
      this.states = states;
   }

   flags = {
      order: "fore" as const,
      disabled: false
   }
   draw() {
      //(Prepend so handles appear on top)
      this.group.prepend(drawLayout(this));
   }
   getConnectors(): ComponentTypes.connector[][] {
      return [[
         makeConnector(this, "emitter", "pin", this.states.joints[INDEXEMITTER], "e"),
         makeConnector(this, "collector", "pin", this.states.joints[INDEXCOLLECTOR], "c"),
         makeConnector(this, "base", "pin", this.states.joints[INDEXBASE], "b")
      ]];
   }
   transferFunction() { return [] };
}

