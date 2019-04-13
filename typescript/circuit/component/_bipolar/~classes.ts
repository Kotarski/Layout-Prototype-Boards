import { Vector } from "../../../-vector";
import Component, { Types as ComponentTypes } from "../../+component";;
import deepCopy from "../../../utility/-deepCopy";
import Insert from "../../../utility/~insert";
import * as Types from "./types";
import { INDEXBASE, INDEXCOLLECTOR, INDEXEMITTER } from "./constants";
import makeConnector from "../../generics/-makeConnector";
import drawLayout from "./-drawLayout";
import drawSchematic from "./-drawSchematic";
import { makeGroup } from "../../../svg/element/+group";
//import * as $ from 'jquery';

interface name {
   name: "bipolar"
}

abstract class BipolarBase implements Types.values, name {
   name = "bipolar" as "bipolar";
   group = makeGroup();
   disabled = false;
   currentGain: number;
   type: "NPN" | "PNP"
   joints: [Vector, Vector, Vector];
   constructor(values: Types.values) {
      $(this.group.element).addClass("component " + this.name);
      this.joints = values.joints;
      this.type = values.type;
      this.currentGain = values.currentGain;
   }

   getProperties(): Types.properties {
      return deepCopy({
         name: this.name,
         currentGain: this.currentGain,
         type: this.type
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

export class BipolarSchematic extends BipolarBase implements Component {
   form = "schematic" as "schematic"
   draw() {
      //(Prepend so handles appear on top)
      this.group.prepend(drawSchematic(this));
   }
   getConnectors(): ComponentTypes.connector[][] {
      return [[
         makeConnector(this, "emitter", "node", this.joints[INDEXEMITTER], "e"),
         makeConnector(this, "collector", "node", this.joints[INDEXCOLLECTOR], "c"),
         makeConnector(this, "base", "node", this.joints[INDEXBASE], "b")
      ]];
   }
}

export class BipolarLayout extends BipolarBase implements Component {
   form = "layout" as "layout"
   draw() {
      //(Prepend so handles appear on top)
      this.group.prepend(drawLayout(this));
   }
   getConnectors(): ComponentTypes.connector[][] {
      return [[
         makeConnector(this, "emitter", "pin", this.joints[INDEXEMITTER], "e"),
         makeConnector(this, "collector", "pin", this.joints[INDEXCOLLECTOR], "c"),
         makeConnector(this, "base", "pin", this.joints[INDEXBASE], "b")
      ]];
   }
}

