namespace Svg.Elements.Graphics.Complexes {
   export class InductorBody extends Graphics.Complex {
      constructor(betweenStart: Global.Types.vector, betweenEnd: Global.Types.vector, classes: string = "") {
         super(classes);
         let centre = { X: (betweenStart.X + betweenEnd.X) / 2, Y: (betweenStart.Y + betweenEnd.Y) / 2 };
         let rotation = Math.atan2(centre.Y - betweenStart.Y, centre.X - betweenStart.X) * 180 / Math.PI;

         const nCoils = 4;
         const wireWidth = 8;
         const coilTop = -15;
         const coilBottom = 15;
         const coilStart = (-(nCoils * wireWidth) / 2 + wireWidth / 4);

         let bodyPath = "M" + (coilStart) + " " + (coilBottom);
         let bodyEdgePath = "";
         for (let i = 1; i < nCoils; i++) {
            let x0 = coilStart + wireWidth * (i - 0.5);
            let x1 = coilStart + wireWidth * (i);
            bodyPath += "L" + (x0) + " " + (coilTop) + "L" + (x1) + " " + (coilBottom);
            bodyEdgePath += "M" + (x0) + " " + (coilBottom) + "L" + (x1) + " " + (coilTop);
         }
         bodyPath += "L" + (-coilStart) + " " + (coilTop);

         this.element.appendChild(new Svg.Elements.Graphics.Simples.Path(
            bodyPath, "highlight highlightwithfill").element
         );

         this.element.appendChild(new Svg.Elements.Graphics.Simples.Path(
            bodyPath, "body").element
         );

         this.element.appendChild(new Svg.Elements.Graphics.Simples.Path(
            bodyEdgePath, "bodyEdge").element
         );

         this.translate({ X: centre.X, Y: centre.Y }).rotate(rotation);
      }
      setValue(num: number) {

         return this;
      }
   }
}