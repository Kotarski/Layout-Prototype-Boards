
export type ComponentForms = "schematic" | "layout";

type SchematicComponentTypes = (
   "resistor" |
   "capacitor"
);

type LayoutComponentTypes = (
   "resistor" |
   "capacitor"
);

// type AllComponentTypes = SchematicComponentTypes | LayoutComponentTypes

export type ComponentTypes<ComponentForm extends ComponentForms> = (
   ComponentForm extends "schematic" ? SchematicComponentTypes :
   ComponentForm extends "layout" ? LayoutComponentTypes : never
);


type ComponentBaseProperties = {

}

type ComponentBaseStates = {
   
}

type ComponentBaseFlags = {
   placement: "top" | "middle" | "bottom",
   disabled?: boolean
}


export interface ComponentBaseData {
   form: ComponentForms,
   type: string,
   properties: ComponentBaseProperties,
   states: ComponentBaseStates,
   flags: ComponentBaseFlags
} 

export type ComponentBaseSpecifier<ComponentForm extends ComponentForms, ComponentType extends ComponentTypes<ComponentForm>> = {
   // Whether it is a schematic or a layout component
   form: ComponentForm
   // Which component (resistor, capacitor etc)
   type: ComponentType,
}








