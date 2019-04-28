import vector, { Vector } from "../../-vector";
import testType from "../../utility/-testType";
import validateType from "../../utility/-validateType";
import { checkfunction } from "../../utility/-validateType";

namespace ValueCheck {

   export const test = testType;
   export const validate = validateType;
   export type validater<T> = checkfunction<T>

   export type Defaulter<T extends {}> = {
      [K in keyof T]: checkfunction<T[K]>
   }

   const integerTest = (n: unknown) => test("number")(n) && Number.isInteger(n);
   export function integer(fallback: number): validater<number> {
      const result = (value: unknown, log: boolean = false) => {
         return validate(integerTest, fallback)(value, log);
      }

      return result;
   }

   export function where(fallback: Vector): validater<Vector> {
      const result = (value: unknown, log: boolean = false) => {
         const anyVector = validate(vector.isVector, fallback)(value, log);
         return vector.standardise(anyVector);
      }

      return result;
   }

   export function joints<T extends Vector[]>(fallback: T, lengthTest: (l: number) => boolean = l => l === fallback.length): validater<T> {
      const jointTest = (value: unknown) => vector.isVectorArray(value) && lengthTest(value.length);
      const result = (value: unknown, log: boolean = false) => {
         const anyVectors = validate(jointTest, fallback)(value, log);
         return vector.standardise(anyVectors) as T;
      }

      return result;
   }

   /* Can't guarantee validity, but can guarantee it isn't definitely invalid*/
   const maxValidCSSColorLength = 25;
   const colorTest = (s: unknown) => test("string")(s) && s.length <= maxValidCSSColorLength;

   export function color(fallback: string): validater<string> {
      const result = (value: unknown, log: boolean = false) => {
         return validate(colorTest, fallback)(value, log);
      }

      return result;
   }
}

export default ValueCheck;
