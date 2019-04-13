import Component, { Types as ComponentTypes } from "../../+component";
import * as Types from "./types";
import vector, { Vector } from "../../../-vector";
import deepCopy from "../../../utility/-deepCopy";
import makeConnector from "../../generics/-makeConnector";
import drawLayout from "./-drawLayout";
import drawSchematic from "./-drawSchematic";
import { INDEXINPOS, INDEXINNEG, INDEXOUT, INDEXPOW1, INDEXPOW2, INDEXCENTRE, INDEXROTATION } from "./constants";

import { gridSpacing } from "../../../~constants";
import { makeGroup } from "../../../svg/element/+group";

abstract class Base implements Types.properties {
   name = "opamp" as "opamp";
   group = makeGroup();
   disabled = false;
   offsetVoltage: number;

   constructor(values: Types.valuesSchematic | Types.valuesLayout) {
      this.offsetVoltage = values.offsetVoltage;
   }

   getProperties(): Types.properties {
      return deepCopy({
         name: this.name,
         offsetVoltage: this.offsetVoltage
      });
   }

   abstract getState(): Types.stateLayout | Types.stateSchematic;

   flags = {
      order: "fore" as "fore"
   }

   transferFunction() { return [] };
}

export class Schematic extends Base implements Component, Types.valuesSchematic {
   form = "schematic" as "schematic"
   joints: [Vector, Vector, Vector, Vector, Vector];
   constructor(values: Types.valuesSchematic) {
      super(values);
      this.offsetVoltage = values.offsetVoltage;
      this.joints = values.joints;
   }
   getState(): Types.stateSchematic {
      return deepCopy({
         joints: this.joints,
         disabled: this.disabled
      });
   }
   draw() {
      //(Prepend so handles appear on top)
      this.group.prepend(drawSchematic(this));
   }
   getConnectors(): ComponentTypes.connector[][] {

      let [posPower, negPower] = (this.joints[INDEXPOW1].y < this.joints[INDEXPOW2].y)
         ? [this.joints[INDEXPOW1], this.joints[INDEXPOW2]]
         : [this.joints[INDEXPOW2], this.joints[INDEXPOW1]];

      return [[
         // The ordering here is important so the colors line up between layout and schematic
         makeConnector(this, "vcc+", "node", posPower, "v+"),              //7
         makeConnector(this, "out", "node", this.joints[INDEXOUT], "o"),   //6
         makeConnector(this, "in-", "node", this.joints[INDEXINNEG], "i-"),//2
         makeConnector(this, "in+", "node", this.joints[INDEXINPOS], "i+"),//3
         makeConnector(this, "vcc-", "node", negPower, "v-"),              //4
         //makeConnector(this, "nc", "node", {???}),                       //8
         //makeConnector(this, "offset n1", "node", {???}),                //5
         //makeConnector(this, "offset n2", "node", {???}),                //1
      ]];
   }
}

export class Layout extends Base implements Component, Types.valuesLayout {
   form = "layout" as "layout"
   isDual: boolean;
   joints: [Vector, Vector];
   constructor(values: Types.valuesLayout) {
      super(values);
      this.offsetVoltage = values.offsetVoltage;
      this.isDual = values.isDual;
      this.joints = values.joints;
   }
   getState(): Types.stateLayout {
      return deepCopy({
         isDual: this.isDual,
         joints: this.joints,
         disabled: this.disabled
      });
   }
   draw() {
      //(Prepend so handles appear on top)
      this.group.prepend(drawLayout(this));
   }
   getConnectors(): ComponentTypes.connector[][] {
      const gs = gridSpacing;

      const c = this.joints[INDEXCENTRE];
      const r = vector(this.joints[INDEXCENTRE]).getAngleTo(this.joints[INDEXROTATION]);

      const connectorPoints = vector([
         { x: 0 * gs, y: 3 * gs },//1
         { x: 1 * gs, y: 3 * gs },//2
         { x: 2 * gs, y: 3 * gs },//3
         { x: 3 * gs, y: 3 * gs },//4
         { x: 3 * gs, y: 0 * gs },//5
         { x: 2 * gs, y: 0 * gs },//6
         { x: 1 * gs, y: 0 * gs },//7
         { x: 0 * gs, y: 0 * gs } //8
      ]).sumWith(vector(-30)).rotate(r).sumWith(c).vectors;


      if (this.isDual) {
         // Note that the power selectors physically occupy the same space.
         return [[
            makeConnector(this, "vcc+", "pin", connectorPoints[7], "v+"),  //8
            makeConnector(this, "out", "pin", connectorPoints[6], "1o"),   //7
            makeConnector(this, "in-", "pin", connectorPoints[5], "1i-"),  //6
            makeConnector(this, "in+", "pin", connectorPoints[4], "1i+"),  //5
            makeConnector(this, "vcc-", "pin", connectorPoints[3], "v-"),  //4
         ], [
            makeConnector(this, "vcc+", "pin", connectorPoints[7], "v+"),  //8
            makeConnector(this, "out", "pin", connectorPoints[0], "2o"),   //1
            makeConnector(this, "in-", "pin", connectorPoints[1], "2i-"),  //2
            makeConnector(this, "in+", "pin", connectorPoints[2], "2i+"),  //3
            makeConnector(this, "vcc-", "pin", connectorPoints[3], "v-"),  //4
         ]];
      } else {
         return [[
            // The ordering here is important so the colors line up between layout and schematic
            makeConnector(this, "vcc+", "pin", connectorPoints[6], "v+"),  //7
            makeConnector(this, "out", "pin", connectorPoints[5], "o"),    //6
            makeConnector(this, "in-", "pin", connectorPoints[1], "i-"),   //2
            makeConnector(this, "in+", "pin", connectorPoints[2], "i+"),   //3
            makeConnector(this, "vcc-", "pin", connectorPoints[3], "v-"),  //4
            makeConnector(this, "nc", "pin", connectorPoints[7], "nc"),    //8
            makeConnector(this, "offset n1", "pin", connectorPoints[4], "nc"), //5
            makeConnector(this, "offset n2", "pin", connectorPoints[0], "nc"), //1
         ]];
      }

   }
   replaceWithDual() {
      this.isDual = true;
      this.group.clearChildren();
      this.draw();
   }

}

