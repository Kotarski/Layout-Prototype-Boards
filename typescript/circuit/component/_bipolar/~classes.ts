import Component, { Types as ComponentTypes } from "../../+component";;
import * as Types from "./types";
import { INDEXBASE, INDEXCOLLECTOR, INDEXEMITTER } from "./constants";
import makeConnector from "../../generics/-makeConnector";
import drawLayout from "./-drawLayout";
import drawSchematic from "./-drawSchematic";
import { makeGroup } from "../../../svg/element/+group";
//import * as $ from 'jquery';

abstract class BipolarBase {
   type = "bipolar" as "bipolar";
   group = makeGroup();
   properties: Types.properties;
   states: Types.state;
   constructor(values: Types.values) {
      $(this.group.element).addClass("component " + this.type);
      this.properties = {
         type: values.type,
         currentGain: values.currentGain
      }
      this.states = {
         joints: values.joints
      }
   }

   flags = {
      order: "fore" as "fore",
      disabled: false
   }

   transferFunction() { return [] };
}

export class BipolarSchematic extends BipolarBase implements Component, Types.bipolar<"schematic"> {
   form = "schematic" as "schematic"
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
}

export class BipolarLayout extends BipolarBase implements Component, Types.bipolar<"layout"> {
   form = "layout" as "layout"
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
}

