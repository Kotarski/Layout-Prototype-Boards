import { Vector } from "../../../-vector";
import Component, { Types as ComponentTypes } from "../../+component";;
import deepCopy from "../../../utility/-deepCopy";
import Insert from "../../../utility/~insert";
import * as Types from "./types";
import { INDEXBASE, INDEXCOLLECTOR, INDEXEMITTER } from "./constants";
import manifest from "../../manifest";
import getComponentConnections from "../../generics/-getComponentConnections";
import makeConnector from "../../generics/-makeConnector";
import drawLayout from "./-drawLayout";
import drawSchematic from "./-drawSchematic";
//import * as $ from 'jquery';

abstract class BipolarBase extends Component implements Types.values {
   currentGain: number;
   type: "NPN" | "PNP"
   joints: [Vector, Vector, Vector];
   constructor(values: Types.values) {
      super(values);
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

export class BipolarSchematic extends BipolarBase {
   draw() {
      //(Prepend so handles appear on top)
      this.group.prepend(drawSchematic(this));
   }
   getConnections(): ComponentTypes.connector[][][] {
      return getComponentConnections(this, manifest.schematic);
   }
   makeConnectors() {
      this.connectorSets = [[
         makeConnector(this, "emitter", "node", this.joints[INDEXEMITTER], "e"),
         makeConnector(this, "collector", "node", this.joints[INDEXCOLLECTOR], "c"),
         makeConnector(this, "base", "node", this.joints[INDEXBASE], "b")
      ]];
   }
}

export class BipolarLayout extends BipolarBase {
   draw() {
      //(Prepend so handles appear on top)
      this.group.prepend(drawLayout(this));
   }
   getConnections(): ComponentTypes.connector[][][] {
      return getComponentConnections(this, manifest.layout);
   }
   makeConnectors() {
      this.connectorSets = [[
         makeConnector(this, "emitter", "pin", this.joints[INDEXEMITTER], "e"),
         makeConnector(this, "collector", "pin", this.joints[INDEXCOLLECTOR], "c"),
         makeConnector(this, "base", "pin", this.joints[INDEXBASE], "b")
      ]];
   }
}

