namespace Insert {
   export function last(element: Element, target?: Element) {
      if (element === target || target === undefined) {
         $(element).insertAfter($(element).siblings().last());
      } else if ($(target).children().length) {
         $(element).insertAfter($(target).children().last());
      } else {
         $(element).appendTo(target);
      }
   }

   export function first(element: Element, target?: Element) {
      if (element === target || target === undefined) {
         $(element).insertBefore($(element).siblings().first());
      } else if ($(target).children().length) {
         $(element).insertBefore($(target).children().first());
      } else {
         $(element).prependTo(target);
      }
   }

   export function before(element: Element, target?: Element): void
   export function before(element: Element, referenceSelector: string): void
   export function before(element: Element, target?: Element, referenceSelector?: string): void
   export function before(element: Element, targetOrRef?: Element | string, referenceSelector: string = "*"): void {
      let target = (typeof targetOrRef === "string") ? undefined : targetOrRef;
      referenceSelector = (typeof targetOrRef === "string") ? targetOrRef : referenceSelector;
      if (element === target || target === undefined) {
         $(element).insertBefore($(element).siblings(referenceSelector).first());
      } else if ($(target).children(referenceSelector).length) {
         $(element).insertBefore($(target).children(referenceSelector).first());
      } else {
         $(element).prependTo(target);
      }
   }

   export function after(element: Element, target?: Element): void
   export function after(element: Element, referenceSelector: string): void
   export function after(element: Element, target?: Element, referenceSelector?: string): void
   export function after(element: Element, targetOrRef?: Element | string, referenceSelector: string = "*"): void {
      let target = (typeof targetOrRef === "string") ? undefined : targetOrRef;
      referenceSelector = (typeof targetOrRef === "string") ? targetOrRef : referenceSelector;
      if (element === target || target === undefined) {
         $(element).insertAfter($(element).siblings(referenceSelector).last());
      } else if ($(target).children(referenceSelector).length) {
         $(element).insertAfter($(target).children(referenceSelector).last());
      } else {
         $(element).prependTo(target);
      }
   }
}

export default Insert;