namespace Utility.Insert {
   export function last(element: Node, target?: Node) {
      if (element === target || target === undefined) {
         $(element).insertAfter($(element).siblings().last());
      } else if ($(target).children().length) {
         $(element).insertAfter($(target).children().last());
      } else {
         $(element).appendTo($(target));
      }
   }

   export function first(element: Node, target?: Node) {
      if (element === target || target === undefined) {
         $(element).insertBefore($(element).siblings().first());
      } else if ($(target).children().length) {
         $(element).insertBefore($(target).children().first());
      } else {
         $(element).prependTo($(target));
      }
   }

   export function before(element: Node, target?: Node): void
   export function before(element: Node, referenceSelector: string): void
   export function before(element: Node, target?: Node, referenceSelector?: string): void
   export function before(element: Node, targetOrRef?: Node | string, referenceSelector: string = "*"): void {
      let target = (typeof targetOrRef === "string") ? undefined : targetOrRef;
      referenceSelector = (typeof targetOrRef === "string") ? targetOrRef : referenceSelector;
      if (element === target || target === undefined) {
         $(element).insertBefore($(element).siblings(referenceSelector).first());
      } else if ($(target).children(referenceSelector).length) {
         $(element).insertBefore($(target).children(referenceSelector).first());
      } else {
         $(element).prependTo($(target));
      }
   }

   export function after(element: Node, target?: Node): void
   export function after(element: Node, referenceSelector: string): void
   export function after(element: Node, target?: Node, referenceSelector?: string): void
   export function after(element: Node, targetOrRef?: Node | string, referenceSelector: string = "*"): void {
      let target = (typeof targetOrRef === "string") ? undefined : targetOrRef;
      referenceSelector = (typeof targetOrRef === "string") ? targetOrRef : referenceSelector;
      if (element === target || target === undefined) {
         $(element).insertAfter($(element).siblings(referenceSelector).last());
      } else if ($(target).children(referenceSelector).length) {
         $(element).insertAfter($(target).children(referenceSelector).last());
      } else {
         $(element).prependTo($(target));
      }
   }
}