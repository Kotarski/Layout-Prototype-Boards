namespace Svg.Elements {
   export class Group extends Svg.Element {
      constructor(classes: string = "") {
         super("g", classes);
      }

      append(elements: Svg.Element | Svg.Element[]): this {
         // this.element.appendChild(element.element);
         // To allow method chaining;
         return this._addChildren(elements, (element: SVGElement) => {
            this.element.appendChild(element);
         });
      }

      //Note when given an array, the z-order is not reversed.
      prepend(elements: Svg.Element | Svg.Element[]): this {
         // this.element.insertBefore(element.element, this.element.firstChild);
         // To allow method chaining;
         let firstChild = this.element.firstChild;
         return this._addChildren(elements, (element: SVGElement) => {
            this.element.insertBefore(element, firstChild);
         });
      }

      private _addChildren(
         elements: Svg.Element | Svg.Element[],
         addCallback: (element: SVGElement) => void
      ): this {
         elements = elements instanceof Array ? elements : [elements];
         elements.forEach(element => addCallback(element.element));

         // To allow method chaining;
         return this;
      }

   }

}

// namespace Svg.Elements {
//    type Group = ReturnType<typeof getGroupExtension> & SVGGElement;

//    export function makeGroup(classes: string): Group {
//       const element = makeSVGElement<SVGGElement>("g", classes);
//       return Object.assign({}, element, getGroupExtension(element));
//    }

//    function getGroupExtension(element: SVGGElement) {
//       return {
//          append<T extends SVGGraphicsElement>(children: T | T[]): SVGGElement {
//             addChildren(children, (child: T) => element.appendChild(child));
//             return element;
//          },
//          //Note when given an array, the z-order is not reversed.
//          prepend<T extends SVGGraphicsElement>(children: T | T[]): SVGGElement {
//             const firstChild = element.firstChild;
//             addChildren(children, (child: T) => element.insertBefore(child, firstChild));
//             return element;
//          }
//       }
//    }

//    function addChildren<T extends SVGGraphicsElement>(children: T | T[], insertFn: (child: T) => void) {
//       children = children instanceof Array ? children : [children];
//       children.forEach(child => insertFn(child));
//    }

//    let myGroup = makeGroup("hi");

// }