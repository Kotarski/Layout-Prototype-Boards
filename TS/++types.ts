

namespace Global {
   export namespace Types {
      export type polar = {
         radius: number;
         angle: number;
      }

      export type size = {
         width: number;
         height: number;
      }

      export type rect = Vector & size;

      export type orientation = (0 | 90 | 180 | 270);

      export type DeepPartial<T> = {
         [P in keyof T]?: T[P] extends Array<infer U>
         ? Array<DeepPartial<U>>
         : T[P] extends ReadonlyArray<infer U>
         ? ReadonlyArray<DeepPartial<U>>
         : DeepPartial<T[P]>
      };
   }
}