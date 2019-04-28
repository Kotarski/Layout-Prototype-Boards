import {  ComponentQuery } from "../@componentBase";
import { Vector } from "../../../++types";
import { DraggableComponent } from "../addins/@draggable";

type Properties = {
   resistance: number;
}

interface ResistorSchematicID {
   form: "schematic",
   type: "resistor"
}

interface ResistorSchematicSavedData extends ResistorSchematicID {
   properties: Properties,
   states: {
      joints: [Vector,Vector]//Record<"lead0"|"lead1", Vector>
   }
}

interface ResistorSchematicBaseData extends ResistorSchematicSavedData {
   flags: {
      order: "fore"
   }
}

type ResistorSchematicData = DraggableComponent<ResistorSchematicBaseData>;

interface ResistorLayoutID {
   form: "layout",
   type: "resistor"
}

interface ResistorLayoutSavedData extends ResistorLayoutID {
   properties: Properties
   states: {
      joints: [Vector,Vector]//Record<"lead0"|"lead1", [Vector, ...Vector[]]>
   }
}

interface ResistorLayoutBaseData extends ResistorLayoutSavedData {
   flags: {
      order: "fore"
   },
}

type ResistorLayoutData = DraggableComponent<ResistorLayoutBaseData>;


namespace Resistor {
   export type SchematicQuery = ComponentQuery<
      ResistorSchematicSavedData, ResistorSchematicBaseData, ResistorSchematicData
   >
   export type LayoutQuery = ComponentQuery<
      ResistorLayoutSavedData, ResistorLayoutBaseData, ResistorLayoutData
   >
}
export default Resistor;