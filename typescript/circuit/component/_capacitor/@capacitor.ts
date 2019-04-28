
import { ComponentQuery } from "../@componentBase";
import { DraggableComponent } from "../addins/@draggable";
import { Vector } from "../../../++types";


type Properties = {
   capacitance: number;
}

interface SchematicID {
   form: "schematic",
   type: "capacitor"
}

interface SchematicSavedData extends SchematicID {
   properties: Properties,
   states: {
      joints: [Vector,Vector]//Record<"lead0"|"lead1", Vector>
   }
}

interface SchematicBaseData extends SchematicSavedData {
   flags: {
      order: "mid"
   }
}

type SchematicData = DraggableComponent<SchematicBaseData>;

interface LayoutID {
   form: "layout",
   type: "capacitor"
}

interface LayoutSavedData extends LayoutID {
   properties: Properties
   states: {
      joints: [Vector,Vector]//Record<"lead0"|"lead1", [Vector, ...Vector[]]>
   }
}

interface LayoutBaseData extends LayoutSavedData {
   flags: {
      order: "mid"
   },
}
type LayoutData = DraggableComponent<LayoutBaseData>;

namespace Capacitor {
   export type SchematicQuery = ComponentQuery<
      SchematicSavedData, SchematicBaseData, SchematicData>
   export type LayoutQuery = ComponentQuery<
      LayoutSavedData, LayoutBaseData, LayoutData>
}
export default Capacitor;