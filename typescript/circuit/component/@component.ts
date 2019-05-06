import Resistor from "./resistor/@resistor";
import Capacitor from "./_capacitor/@capacitor";
import ValueCheck from "./~valueCheck";
import { DeepPartial } from "../../++types";

type ComponentDataQuery = (
   Resistor.LayoutQuery |
   Resistor.SchematicQuery |
   Capacitor.LayoutQuery |
   Capacitor.SchematicQuery
)

export type Forms = "schematic" | "layout"
export type Types = ComponentDataQuery["idents"]["type"]

type Ident<Type extends Types, Form extends Forms>
   = { idents: { form: Form, type: Type } }

export type ComponentSaved<Type extends Types, Form extends Forms>
   = Extract<ComponentDataQuery, Ident<Type, Form>>["savedData"]

export type ComponentBase<Type extends Types, Form extends Forms>
   = Extract<ComponentDataQuery, Ident<Type, Form>>["baseData"]

export type Component<Type extends Types, Form extends Forms>
   = Extract<ComponentDataQuery, Ident<Type, Form>>["data"]
















   

export type ComponentDefaulter<T extends { properties: {}, states: {}}> = {
   properties: ValueCheck.Defaulter<T["properties"]>,
   states: ValueCheck.Defaulter<T["states"]>
}

export type ComponentFactoryFactory = 
   <Type extends Types, Form extends Forms>(raw: any) =>
      () => void

/** Get the data that is available */
export type LoadSavedComponentData<Type extends Types, Form extends Forms> = 
   (raw: any) => DeepPartial<ComponentSaved<Type, Form>>

/** Substitute defaults for the data that is not */
export type MakeBaseComponent<Type extends Types, Form extends Forms> =
   (partialData: DeepPartial<ComponentSaved<Type, Form>>) => ComponentBase<Type, Form>

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



