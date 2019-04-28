import Component, { Types as ComponentTypes } from "../../+component";;
import * as Types from "./types";
import makeConnector from "../../generics/-makeConnector";
import Flatten from "../../../utility/~flatten";
import drawLayout from "./-drawLayout";
import drawSchematic from "./-drawSchematic";
import { makeGroup } from "../../../svg/element/+group";

abstract class Base implements Types.properties {
   type = "wire" as const;
   group = makeGroup();
}

export class Schematic extends Base implements Component, Types.wire<"schematic"> {
   form = "schematic" as const
   properties: Types.properties
   states: Types.stateSchematic
   constructor(properties: Types.properties, states: Types.stateSchematic) {
      super();
      this.properties = properties;
      this.states = states;
   }
   draw() {
      //(Prepend so handles appear on top)
      this.group.prepend(drawSchematic(this));
   }

   flags = {
      order: "back" as const,
      disabled: false
   }

   getConnectors(): ComponentTypes.node[][] {
      const end1 = this.states.joints[0];
      const end2 = this.states.joints[this.states.joints.length - 1];

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

export class Layout extends Base implements Component, Types.wire<"layout"> {
   form = "layout" as const
   properties: Types.properties;
   states: Types.stateLayout;
   constructor(properties: Types.properties, states: Types.stateLayout) {
      super();
      this.properties = properties;
      this.states = states;
   }

   draw() {
      //(Prepend so handles appear on top)
      this.group.prepend(drawLayout(this));
   }

   flags = {
      order: "fore" as const,
      disabled: false
   }

   getConnectors(): ComponentTypes.connector[][] {
      return [[
         makeConnector(this, "end1", "pin", this.states.joints[0]),
         makeConnector(this, "end2", "pin", this.states.joints[this.states.joints.length - 1]),]
      ]
   }
   
   transferFunction(from: ComponentTypes.connector): ComponentTypes.connector[] {
      return Flatten.flatten2d(this.getConnectors().map(connectorSet => connectorSet.filter(
         c => !(c.name === from.name && c.component == from.component) 
      )));
   }
}

