namespace Svg.Elements {
   let textPathCount = 0;
   export class Text extends Svg.Element {
      constructor(text: string, startVector: Global.Types.vector, classes: string = "") {
         super('text', classes);
         this.element.setAttribute('x', startVector.X.toString());
         this.element.setAttribute('y', startVector.Y.toString());
         this.element.appendChild(document.createTextNode(text));
      }

      followPath(pathString: string): this {
         // Make a new path
         let path = new Path(pathString);
         $(path.element).hide();

         // Give it a generated (hopefully unique)  ID
         let pathID = "pathForText" + textPathCount;
         path.element.setAttribute("id", pathID);
         textPathCount += 1;

         // Make the text path, and link it to the path
         let textPathEl = Svg.makeSVGElement("textPath");
         textPathEl.setAttribute("href", "#" + pathID);

         // Get text content, remove from textEl and add to text pathEl
         let text = $(this.element).text();
         $(this.element).text("");
         textPathEl.appendChild(document.createTextNode(text));

         // Add the path and textpath as children
         this.element.appendChild(path.element);
         this.element.appendChild(textPathEl);
         return this;
      }
   }
}
