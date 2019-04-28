import Resistor from "./resistor/@resistor";
import Capacitor from "./_capacitor/@capacitor";
import ValueCheck from "./~valueCheck";

type ComponentDataTypes = "SavedData" | "BaseData" | "Data"

type ComponentDataQuery<DataType extends ComponentDataTypes> = (
   Resistor.LayoutQuery[DataType] |
   Resistor.SchematicQuery[DataType] |
   Capacitor.LayoutQuery[DataType] |
   Capacitor.SchematicQuery[DataType]
)

type ComponentSavedDatas = ComponentDataQuery<"SavedData">;
type ComponentBaseDatas = ComponentDataQuery<"BaseData">;
type ComponentDatas = ComponentDataQuery<"Data">;

type Forms = "schematic" | "layout"
type Types = ComponentDataQuery<"Data">["type"]

export type ComponentSaved<Type extends Types, Form extends Forms, Saved extends Extract<ComponentSavedDatas, {
   form: Form,
   type: Type
}> = Extract<ComponentSavedDatas, {
   form: Form,
   type: Type
}>> = Saved["properties"] & Saved["states"]

export type ComponentBase<Type extends Types, Form extends Forms> = Extract<ComponentBaseDatas, {
   form: Form,
   type: Type
}>

export type Component<Type extends Types, Form extends Forms> = Extract<ComponentDatas, {
   form: Form,
   type: Type
}>

export type ComponentDefaulter<T extends { properties: {}, states: {}}> = {
   properties: ValueCheck.Defaulter<T["properties"]>,
   states: ValueCheck.Defaulter<T["states"]>
}

/** Get the data that is available */
export type LoadSavedComponentData<Type extends Types, Form extends Forms> = 
   (raw: any) => Partial<ComponentSaved<Type, Form>>

/** Substitute defaults for the data that is not */
export type MakeBaseComponent<Type extends Types, Form extends Forms> =
   (partialData: Partial<ComponentSaved<Type, Form>>) => ComponentBase<Type, Form>

/** Add draggable etc to finalise (is there a better name?) */
export type AddComponentAddins<Type extends Types, Form extends Forms> = 
   (baseData: ComponentBase<Type, Form>) => Component<Type, Form>

/** Shortcut for making a component in one step (e.g. using a chain) */
export type MakeComponent<Type extends Types, Form extends Forms> =
   (partialData: Partial<ComponentSaved<Type, Form>>) => Component<Type, Form>

/** Shortcut for loading a component in one step (e.g. using a chain) */
export type LoadComponent<Type extends Types, Form extends Forms> =
   (raw: any) => Component<Type, Form>

/** */
export type DrawComponent<Type extends Types, Form extends Forms> =
   (data: Component<Type, Form>) => SVGGElement

export type GetState<Type extends Types, Form extends Forms> =
   (data: Component<Type, Form>) => Component<Type, Form>["states"]

export type GetProperties<Type extends Types, Form extends Forms> =
   (data: Component<Type, Form>) => Component<Type, Form>["properties"]

export type GetFlags<Type extends Types, Form extends Forms> =
   (data: Component<Type, Form>) => Component<Type, Form>["flags"]



