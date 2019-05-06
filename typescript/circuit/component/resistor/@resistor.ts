import {  ComponentQuery, ComponentBaseData } from "../@componentBase";
import { Vector } from "../../../++types";
import { DraggableComponent } from "../addins/@draggable";

type Properties = {
   resistance: number;
}

interface ResistorSchematicBaseData extends ComponentBaseData {
   ident: {
      form: "schematic",
      type: "resistor"
   },
   states: {
      joints: [Vector,Vector]//Record<"lead0"|"lead1", Vector>
   }
   properties: Properties,
   flags: {
      order: "fore"
   }
}

interface ResistorLayoutBaseData extends ComponentBaseData {
   ident: {
      form: "layout",
      type: "resistor"
   },
   states: {
      joints: [Vector,Vector]//Record<"lead0"|"lead1", Vector>
   }
   properties: Properties,
   flags: {
      order: "fore"
   }
}


type ResistorSchematicData = DraggableComponent<ResistorSchematicBaseData>;



type ResistorLayoutData = DraggableComponent<ResistorLayoutBaseData>;


namespace Resistor {
   export type SchematicQuery = ComponentQuery<
      ResistorSchematicBaseData, ResistorSchematicData
   >
   export type LayoutQuery = ComponentQuery<
      ResistorLayoutBaseData, ResistorLayoutData
   >
}
export default Resistor;