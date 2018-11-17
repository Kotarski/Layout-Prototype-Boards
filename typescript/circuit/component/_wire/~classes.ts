import Component, { Types as ComponentTypes } from "../../+component";;
import * as Types from "./types";
import { Vector } from "../../../-vector";
import deepCopy from "../../../utility/-deepCopy";
import Insert from "../../../utility/~insert";
import manifest from "../../manifest";
import getComponentConnections from "../../generics/-getComponentConnections";
import makeConnector from "../../generics/-makeConnector";
import Flatten from "../../../utility/~flatten";
import isNot from "../../../utility/-isNot";
import drawLayout from "./-drawLayout";
import drawSchematic from "./-drawSchematic";

abstract class Base extends Component implements Types.properties {
   getProperties(): Types.properties {
      return deepCopy({
         name: this.name
      });
   }

   transferFunction(from: ComponentTypes.connector): ComponentTypes.connector[] {
      return Flatten.flatten2d(this.connectorSets.map(connectorSet => connectorSet.filter(isNot(from))));
   }
}

export class Schematic extends Base implements Types.valuesSchematic {
   joints: Vector[];
   connectorSets: ComponentTypes.node[][] = [];

   constructor(values: Types.valuesSchematic) {
      super(values);
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

   insertInto(element?: SVGGraphicsElement) {
      Insert.first(this.group.element, element);
   }

   makeConnectors() {
      const end1 = this.joints[0];
      const end2 = this.joints[this.joints.length - 1];

      this.connectorSets = [[
         makeConnector(this, "", "node", end1),
         makeConnector(this, "", "node", end2)]
      ]
   }

   getConnections(): ComponentTypes.connector[][][] {
      return getComponentConnections(this, manifest.schematic);
   }

}

export class Layout extends Base implements Types.valuesLayout {
   joints: Vector[];
   color: string;

   constructor(values: Types.valuesLayout) {
      super(values);
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

   insertInto(element?: SVGGraphicsElement) {
      Insert.last(this.group.element, element);
   }

   makeConnectors() {
      this.connectorSets = [[
         makeConnector(this, "", "pin", this.joints[0]),
         makeConnector(this, "", "pin", this.joints[this.joints.length - 1]),]
      ]
   }

   getConnections(): ComponentTypes.connector[][][] {
      return getComponentConnections(this, manifest.layout);
   }
}

