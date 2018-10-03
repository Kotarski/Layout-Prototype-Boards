/// <reference path="../../Utility/-validateType.ts" />
/// <reference path="../../Utility/-testType.ts" />


namespace Circuit.Component.ValueCheck {
   export import test = Utility.testType;
   export import validate = Utility.validateType;
   export import validater = Utility.checkfunction;

   export type Defaulter<T> = {
      [P in keyof T]: validater<T[P]>
   }

   const integerTest = (n: unknown) => test("number")(n) && Number.isInteger(n);
   export function integer(fallback: number): validater<number> {
      const result = (value: unknown) => {
         return validate(integerTest, fallback)(value);
      }

      return result;
   }

   export function where(fallback: Vector): ValueCheck.validater<Vector> {
      const result = (value: unknown) => {
         const anyVector = validate(vector.isVector, fallback)(value);
         return vector.standardise(anyVector);
      }

      return result;
   }

   export function joints<T extends Vector[]>(fallback: T, lengthTest: (l: number) => boolean = l => l === fallback.length): validater<T> {
      const jointTest = (value: unknown) => vector.isVectorArray(value) && lengthTest(value.length);
      const result = (value: unknown) => {
         const anyVectors = validate(jointTest, fallback)(value);
         return vector.standardise(anyVectors) as T;
      }

      return result;
   }

   /* Can't guarantee validity, but can guarantee it isn't definitely invalid*/
   const maxValidCSSColorLength = 25;
   const colorTest = (s: unknown) => test("string")(s) && s.length <= maxValidCSSColorLength;

   export function color(fallback: string): validater<string> {
      const result = (value: unknown) => {
         return validate(colorTest, fallback)(value);
      }

      return result;
   }
}
