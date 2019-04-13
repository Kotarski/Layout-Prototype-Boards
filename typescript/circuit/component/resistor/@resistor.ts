import {  ComponentBaseData } from "../@componentBase";
import { Vector } from "../../../++types";
import { DraggableComponent } from "../addins/@draggable";


type Properties = {
   resistance: number;
}

interface SchematicBaseData extends ComponentBaseData {
   form: "schematic",
   type: "resistor",
   properties: Properties
   states: {
      joints: Record<"lead0"|"lead1", Vector>
   },
   flags: {
      placement: "middle"
   },
}
export type SchematicData = DraggableComponent<SchematicBaseData>;

interface LayoutBaseData extends ComponentBaseData {
   form: "layout",
   type: "resistor",
   properties: Properties
   states: {
      joints: Record<"lead0"|"lead1", [Vector, ...Vector[]]>
   },
   flags: {
      placement: "middle"
   },
}
export type LayoutData = DraggableComponent<LayoutBaseData>;


namespace Resistor {
   export type Schematic = {
      BaseData: SchematicBaseData
      Data: SchematicData
   }
   export type Layout = {
      BaseData: LayoutBaseData
      Data: LayoutData
   }
}
export default Resistor;