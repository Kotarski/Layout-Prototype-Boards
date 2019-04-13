import Resistor from "./resistor/@resistor";
import Capacitor from "./_capacitor/@capacitor";


type ComponentDataQuery<Query extends "BaseData" | "Data"> = (
   Resistor.Layout[Query] |
   Resistor.Schematic[Query] |
   Capacitor.Layout[Query] |
   Capacitor.Schematic[Query]
)

type ComponentBaseDatas = ComponentDataQuery<"BaseData">;
type ComponentDatas = ComponentDataQuery<"Data">;

type Forms = "schematic" | "layout"


export type Component<Type extends string, Form = Forms> = Extract<ComponentDatas, {
   form: Form,
   type: Type
}>
   
type ComponentBase<Type extends string, Form = Forms> = Extract<ComponentBaseDatas, {
   form: Form,
   type: Type
}>

export type LoadComponent<Form extends Forms, Type extends string> =
   (raw: { form: Form, type: Type } & unknown) => ComponentBase<Form, Type>

export type MakeComponent<Form extends Forms, Type extends string> =
   (baseData: ComponentBase<Form, Type>) => Component<Form, Type>

export type DrawComponent<Form extends Forms, Type extends string> =
   (data: Component<Form, Type>) => SVGGElement

export type GetState<Form extends Forms, Type extends string> =
   (data: Component<Form, Type>) => Component<Form, Type>["states"]

export type GetProperties<Form extends Forms, Type extends string> =
   (data: Component<Form, Type>) => Component<Form, Type>["properties"]

export type GetFlags<Form extends Forms, Type extends string> =
   (data: Component<Form, Type>) => Component<Form, Type>["flags"]



