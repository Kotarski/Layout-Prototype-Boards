
import { ComponentQuery, ComponentBaseData } from "../@componentBase";
import { DraggableComponent } from "../addins/@draggable";
import { Vector } from "../../../++types";


type Properties = {
   capacitance: number;
}

interface CapacitorSchematicBaseData extends ComponentBaseData {
   ident: {
      form: "schematic",
      type: "capacitor"
   },
   states: {
      joints: [Vector,Vector]//Record<"lead0"|"lead1", Vector>
   }
   properties: Properties,
   flags: {
      order: "fore"
   }
}

interface CapacitorLayoutBaseData extends ComponentBaseData {
   ident: {
      form: "layout",
      type: "capacitor"
   },
   states: {
      joints: [Vector,Vector]//Record<"lead0"|"lead1", Vector>
   }
   properties: Properties,
   flags: {
      order: "fore"
   }
}



type CapacitorSchematicData = DraggableComponent<CapacitorSchematicBaseData>;


type CapacitorLayoutData = DraggableComponent<CapacitorLayoutBaseData>;

namespace Capacitor {
   export type SchematicQuery = ComponentQuery<
      CapacitorSchematicBaseData, CapacitorSchematicData
   >
   export type LayoutQuery = ComponentQuery<
      CapacitorLayoutBaseData, CapacitorLayoutData
   >
}
export default Capacitor;