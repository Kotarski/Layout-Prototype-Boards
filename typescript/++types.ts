import { Vector as VectorImport } from "./-vector"

export type polar = {
   radius: number;
   angle: number;
}

export type size = {
   width: number;
   height: number;
}

export type Vector = VectorImport;

export type rect = Vector & size;

export type orientation = (0 | 90 | 180 | 270);

export type DeepPartial<T> = {
   [P in keyof T]?: T[P] extends Array<infer U>
   ? Array<DeepPartial<U>>
   : T[P] extends ReadonlyArray<infer U>
   ? ReadonlyArray<DeepPartial<U>>
   : DeepPartial<T[P]>
};
export type baseTypes = "string" | "number" | "boolean" | "symbol" | "undefined" | "object" | "function";

export type NameType<T> = (
   T extends "string" ? string :
   T extends "number" ? number :
   T extends "boolean" ? boolean :
   T extends "undefined" ? undefined :
   T extends "function" ? Function :
   object
);

