namespace Svg.Elements {
   let textPathCount = 0;
   export class TextPath extends Svg.Element {
      constructor(text: Text, path: Path) {
         super('textPath');

         let pathID = path.element.getAttribute("id");
         if (!pathID) {
            pathID = "pathForText" + textPathCount;
            path.element.setAttribute("id", pathID);
            textPathCount += 1;
         }

         this.element.setAttribute("href", "#" + pathID);

         let textContent = text.element.textContent || "";

         this.element.appendChild(document.createTextNode(textContent));
         $(text.element).append(this.element);
      }
   }
}
