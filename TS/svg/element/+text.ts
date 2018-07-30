namespace Svg.Element.Text {
   let textPathCount = 0;
   export type type = ReturnType<typeof make>;
   export function make(text: string, startVector: Vector, classes: string = "") {
      const element: SVGTextElement = Element.make("text", classes);
      element.setAttribute('x', startVector.x.toString());
      element.setAttribute('y', startVector.y.toString());
      element.appendChild(document.createTextNode(text));
      return svg(element);
   }

   export namespace Functions {
      export function followPath<T extends SVGTextElement>(element: T) {
         return (pathString: string) => {
            // Make a new path
            let path = Element.Path.make(pathString);
            $(path.element).hide();

            // Give it a generated (hopefully unique)  ID
            let pathID = "pathForText" + textPathCount;
            path.element.setAttribute("id", pathID);
            textPathCount += 1;

            // Make the text path, and link it to the path
            let textPathEl = Element.make("textPath");
            textPathEl.setAttribute("href", "#" + pathID);

            // Get text content, remove from textEl and add to text pathEl
            let text = $(element).text();
            $(element).text("");
            textPathEl.appendChild(document.createTextNode(text));

            // Add the path and textpath as children
            element.appendChild(path.element);
            element.appendChild(textPathEl);
            return svg(element);
         }
      }
   }

}

