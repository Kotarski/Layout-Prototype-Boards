
export type ComponentForms = "schematic" | "layout";

export type ComponentBaseID = {
   form: ComponentForms,
   type: string
}

export type ComponentBaseProperties = {

}

export type ComponentBaseStates = {
   
}

export interface ComponentSavedData {
   properties: ComponentBaseProperties,
   states: ComponentBaseStates,
}

export type ComponentBaseFlags = {
   order: "fore" | "mid" | "back",
   disabled?: boolean
}

export interface ComponentBaseData extends ComponentBaseID, ComponentSavedData {
   flags: ComponentBaseFlags
}

export interface ComponentData extends ComponentBaseData { }

export interface ComponentQuery<
   SavedData extends ComponentSavedData,
   BaseData extends ComponentBaseData,
   Data extends ComponentData,
   > {
   SavedData: SavedData
   BaseData: BaseData
   Data: Data
}






