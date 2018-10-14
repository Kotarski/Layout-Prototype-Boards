namespace Circuit.Component._Track.Classes {

   export class Layout extends Component.Instance implements Types.properties, Types.state {
      name: string;
      holeSpacings: number[];
      connectorSets: Component.Types.hole[][] = [];
      style: "breadboard" | "stripboard";
      joints: [Vector, Vector];

      constructor(values: Types.properties & Types.state) {
         super(values);
         this.name = values.name;
         this.holeSpacings = values.holeSpacings;
         this.style = values.style;
         this.joints = values.joints;
      }

      getProperties(): Types.properties {
         return Utility.deepCopy({
            name: this.name,
            holeSpacings: this.holeSpacings,
            style: this.style
         });
      }

      getState(): Types.state {
         return Utility.deepCopy({
            joints: this.joints,
            disabled: this.disabled
         });
      }


      draw() {
         //(Prepend so handles appear on top)
         this.group.prepend(drawLayout(this));
      }

      /** Builds and draws the components connectors */
      makeConnectors() {

         const start = this.joints[0];
         const step = this.joints[1];


         this.connectorSets = [[]];
         // Create the holes
         let accHs = 0;
         this.holeSpacings.forEach((hS) => {
            accHs += hS;

            let holePos = vector(step)
               .scaleWith(accHs)
               .sumWith(start)
               .vector;

            this.connectorSets[0].push(
               Component.Generics.makeConnector(this, "", "hole", holePos)
            );
         })
      }

      getConnections(): Component.Types.connector[][][] {
         return Generics.getComponentConnections(this, manifest.layout);
      }

      insertInto(element?: SVGGraphicsElement) {
         Utility.Insert.last(this.group.element, element);
      }

      /** ...
      */
      transferFunction(from: Component.Types.hole): Component.Types.connector[] {
         let fromIdx = this.connectorSets[0].indexOf(from);
         let connected: Component.Types.connector[] = [];
         for (let i = fromIdx + 1; i < this.connectorSets[0].length; i++) {
            if (this.connectorSets[0][i].type === "brokenhole") break;
            connected.push(this.connectorSets[0][i]);
         }
         for (let i = fromIdx - 1; i >= 0; i--) {
            if (this.connectorSets[0][i].type === "brokenhole") break;
            connected.push(this.connectorSets[0][i]);
         }

         return connected;
      }

   }
}
