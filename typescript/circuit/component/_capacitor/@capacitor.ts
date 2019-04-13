
import { ComponentBaseData } from "../@componentBase";
import { DraggableComponent } from "../addins/@draggable";
import { Vector } from "../../../++types";


type Properties = {
   capacitance: number;
}

interface SchematicBaseData extends ComponentBaseData {
   form: "schematic",
   type: "capacitor",
   properties: Properties
   states: {
      joints: Record<"lead0"|"lead1", Vector>
   },
   flags: {
      placement: "middle"
   },
}
type SchematicData = DraggableComponent<SchematicBaseData>;

interface LayoutBaseData extends ComponentBaseData {
   form: "layout",
   type: "capacitor",
   properties: Properties
   states: {
      joints: Record<"lead0"|"lead1", [Vector, ...Vector[]]>
   },
   flags: {
      placement: "middle"
   },
}
type LayoutData = DraggableComponent<LayoutBaseData>;


namespace Capacitor {
   export type Schematic = {
      BaseData: SchematicBaseData
      Data: SchematicData
   }
   export type Layout = {
      BaseData: LayoutBaseData
      Data: LayoutData
   }
}
export default Capacitor;