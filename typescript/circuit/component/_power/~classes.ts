import Component, { Types as ComponentTypes } from "../../+component";
import * as Types from "./types";
import { Vector } from "../../../-vector";
import deepCopy from "../../../utility/-deepCopy";
import Insert from "../../../utility/~insert";
import manifest from "../../manifest";
import getComponentConnections from "../../generics/-getComponentConnections";
import makeConnector from "../../generics/-makeConnector";
import drawLayout from "./-drawLayout";
import drawSchematic from "./-drawSchematic";
abstract class PowerBase extends Component implements Types.values {
   voltage: number;
   joints: [Vector];

   constructor(values: Types.values) {
      super(values);
      this.voltage = values.voltage;
      this.joints = values.joints;
   }

   getProperties(): Types.properties {
      return deepCopy({
         name: this.name,
         voltage: this.voltage
      });
   }

   getState(): Types.state {
      return deepCopy({
         joints: this.joints,
         disabled: this.disabled
      });
   }

   transferFunction() { return [] };
}

export class PowerSchematic extends PowerBase {
   insertInto(element?: SVGGraphicsElement) {
      Insert.last(this.group.element, element);
   }

   /** Builds and draws the components connectors */
   makeConnectors() {
      this.connectorSets = [
         [makeConnector(this, "", "node", this.joints[0])]
      ]
   }

   draw() {
      //(Prepend so handles appear on top)
      this.group.prepend(drawSchematic(this));
   }

   getConnections(): ComponentTypes.connector[][][] {
      return getComponentConnections(this, manifest.schematic);
   }
}

export class PowerLayout extends PowerBase {
   connectorSets: ComponentTypes.hole[][] = [];

   insertInto(element?: SVGGraphicsElement) {
      Insert.after(this.group.element, element, ".board");
   }

   /** Builds and draws the components connectors */
   makeConnectors() {
      this.connectorSets = [[
         makeConnector(this, "", "hole", this.joints[0])
      ]]
   }

   draw() {
      //(Prepend so handles appear on top)
      this.group.prepend(drawLayout(this));
   }

   getConnections(): ComponentTypes.connector[][][] {
      return getComponentConnections(this, manifest.layout);
   }
}

