namespace Utility.Insert {
   export function last(element: Node, target: Node) {
      if (element === target) {
         $(element).insertAfter($(element).siblings().last());
      } else if ($(target).children().length) {
         $(element).insertAfter($(target).children().last());
      } else {
         $(element).appendTo($(target));
      }
   }

   export function first(element: Node, target: Node) {
      if (element === target) {
         $(element).insertBefore($(element).siblings().first());
      } else if ($(target).children().length) {
         $(element).insertBefore($(target).children().first());
      } else {
         $(element).prependTo($(target));
      }
   }

   export function before(element: Node, target: Node, referenceSelector: string = "*") {
      if (element === target) {
         $(element).insertBefore($(element).siblings(referenceSelector).first());
      } else if ($(target).children(referenceSelector).length) {
         $(element).insertBefore($(target).children(referenceSelector).first());
      } else {
         $(element).prependTo($(target));
      }
   }
}