import { Vector as VectorImport } from "./-vector"
export { Strict, Loose } from "ts-strictargs"

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

// See https://github.com/Microsoft/TypeScript/issues/12936#issuecomment-462134690

// Checks that Matchee is a subset of Matcher (no extra properties)
export type Subset<A extends {}, B extends {}> = {
   [P in keyof B]: P extends keyof A ? (B[P] extends A[P] | undefined ? A[P] : never) : never;
}

export type NameType<T> = (
   T extends "string" ? string :
   T extends "number" ? number :
   T extends "boolean" ? boolean :
   T extends "undefined" ? undefined :
   T extends "function" ? Function :
   object
);