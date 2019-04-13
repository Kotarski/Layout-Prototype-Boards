import Component, { Types as ComponentTypes } from "../../+component";;
import * as Types from "./types";
import { Vector } from "../../../-vector";
import deepCopy from "../../../utility/-deepCopy";
import makeConnector from "../../generics/-makeConnector";
import Flatten from "../../../utility/~flatten";
import drawLayout from "./-drawLayout";
import drawSchematic from "./-drawSchematic";
import { makeGroup } from "../../../svg/element/+group";

abstract class Base implements Types.properties {
   name = "wire" as "wire";
   group = makeGroup();
   disabled = false;
   getProperties(): Types.properties {
      return deepCopy({
         name: this.name
      });
   }
}

export class Schematic extends Base implements Component, Types.valuesSchematic {
   form = "schematic" as "schematic"
   joints: Vector[];

   constructor(values: Types.valuesSchematic) {
      super();
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

   flags = {
      order: "back" as "back"
   }

   getConnectors(): ComponentTypes.node[][] {
      const end1 = this.joints[0];
      const end2 = this.joints[this.joints.length - 1];

      return [[
         makeConnector(this, "end1", "node", end1),
         makeConnector(this, "end2", "node", end2)]
      ]
   }
   transferFunction(from: ComponentTypes.connector): ComponentTypes.connector[] {
      return Flatten.flatten2d(this.getConnectors().map(connectorSet => connectorSet.filter(
         c => !(c.name === from.name && c.component == from.component) 
      )));
   }

}

export class Layout extends Base implements Component, Types.valuesLayout {
   form = "layout" as "layout"
   joints: Vector[];
   color: string;

   constructor(values: Types.valuesLayout) {
      super();
      this.joints = values.joints;
      this.color = values.color;
   }


   getState(): Types.stateLayout {
      return deepCopy({
         joints: this.joints,
         color: this.color,
         disabled: this.disabled
      });
   }

   draw() {
      //(Prepend so handles appear on top)
      this.group.prepend(drawLayout(this));
   }

   flags = {
      order: "fore" as "fore"
   }

   getConnectors(): ComponentTypes.connector[][] {
      return [[
         makeConnector(this, "end1", "pin", this.joints[0]),
         makeConnector(this, "end2", "pin", this.joints[this.joints.length - 1]),]
      ]
   }
   
   transferFunction(from: ComponentTypes.connector): ComponentTypes.connector[] {
      return Flatten.flatten2d(this.getConnectors().map(connectorSet => connectorSet.filter(
         c => !(c.name === from.name && c.component == from.component) 
      )));
   }
}

