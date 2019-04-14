import Component, { Types as ComponentTypes } from "../../+component";
import * as Types from "./types";
import vector from "../../../-vector";
import makeConnector from "../../generics/-makeConnector";
import drawLayout from "./-drawLayout";
import drawSchematic from "./-drawSchematic";
import { INDEXINPOS, INDEXINNEG, INDEXOUT, INDEXPOW1, INDEXPOW2, INDEXCENTRE, INDEXROTATION } from "./constants";

import { gridSpacing } from "../../../~constants";
import { makeGroup } from "../../../svg/element/+group";

abstract class Base {
   type = "opamp" as "opamp";
   group = makeGroup();
   properties: Types.properties;
   constructor(values: Types.valuesSchematic | Types.valuesLayout) {
      this.properties = {
         offsetVoltage: values.offsetVoltage
      }
   }

   flags = {
      order: "fore" as "fore",
      disabled: false
   }

   transferFunction() { return [] };
}

export class Schematic extends Base implements Component, Types.opamp<"schematic"> {
   form = "schematic" as "schematic"
   states: Types.stateSchematic;
   constructor(values: Types.valuesSchematic) {
      super(values);
      this.states = {
         joints: values.joints
      }
   }
   draw() {
      //(Prepend so handles appear on top)
      this.group.prepend(drawSchematic(this));
   }
   getConnectors(): ComponentTypes.connector[][] {

      let [posPower, negPower] = (this.states.joints[INDEXPOW1].y < this.states.joints[INDEXPOW2].y)
         ? [this.states.joints[INDEXPOW1], this.states.joints[INDEXPOW2]]
         : [this.states.joints[INDEXPOW2], this.states.joints[INDEXPOW1]];

      return [[
         // The ordering here is important so the colors line up between layout and schematic
         makeConnector(this, "vcc+", "node", posPower, "v+"),              //7
         makeConnector(this, "out", "node", this.states.joints[INDEXOUT], "o"),   //6
         makeConnector(this, "in-", "node", this.states.joints[INDEXINNEG], "i-"),//2
         makeConnector(this, "in+", "node", this.states.joints[INDEXINPOS], "i+"),//3
         makeConnector(this, "vcc-", "node", negPower, "v-"),              //4
         //makeConnector(this, "nc", "node", {???}),                       //8
         //makeConnector(this, "offset n1", "node", {???}),                //5
         //makeConnector(this, "offset n2", "node", {???}),                //1
      ]];
   }
}

export class Layout extends Base implements Component, Types.opamp<"layout"> {
   form = "layout" as "layout"
   states: Types.stateLayout;
   constructor(values: Types.valuesLayout) {
      super(values);
      this.states = {
         joints: values.joints,
         isDual: values.isDual
      }
   }
   draw() {
      //(Prepend so handles appear on top)
      this.group.prepend(drawLayout(this));
   }
   getConnectors(): ComponentTypes.connector[][] {
      const gs = gridSpacing;

      const c = this.states.joints[INDEXCENTRE];
      const r = vector(this.states.joints[INDEXCENTRE]).getAngleTo(this.states.joints[INDEXROTATION]);

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


      if (this.states.isDual) {
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
      this.states.isDual = true;
      this.group.clearChildren();
      this.draw();
   }

}

