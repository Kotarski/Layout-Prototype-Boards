/// <reference path="~classes.ts" />

namespace Circuit.Component._Stripboard {
   const defaulterLayout: ValueCheck.Defaulter<Types.values> = {
      name: ValueCheck.validate("string", "stripboard"),
      disabled: ValueCheck.validate("boolean", false),
      joints: ValueCheck.joints<[Vector, Vector]>(
         [{ x: 0, y: 0 }, { x: 20, y: 0 }]
      ),
      rows: ValueCheck.integer(1),
      columns: ValueCheck.integer(1),
      trackBreaks: validateTrackBreaks([]),
   };

   function validateTrackBreaks<T extends Types.trackBreak[]>(fallback: T): ValueCheck.validater<T> {
      const result = (value: unknown, log: boolean = true) => {
         const predicate = (v: unknown) => ((value && Array.isArray(value) && value.every((tB: Types.trackBreak) => {
            return (('track' in tB) && ('hole' in tB) && (typeof tB.track === 'number') && (typeof tB.hole === 'number'));
         })));

         return ValueCheck.validate<T>(predicate, fallback)(value);
      }

      return result;
   }

   export const makeLayout = getMaker(Classes.Layout, defaulterLayout,
      (component: Classes.Layout) => {
         Addins.Graphical.init(component);
         Addins.Board.init(component, true);
         Addins.Selectable.init(component);
         Addins.WireCreation.init(component);
         Addins.Draggable.init(component);
         Addins.Rotatable.init(component);
      }
   );


}