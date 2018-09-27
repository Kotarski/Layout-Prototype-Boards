namespace Circuit.Component._Architype.Classes {

   abstract class Base extends Component.Instance implements Types.values {

      constructor(values: Types.values) {
         super(values);
      }

      getProperties(): Types.properties {

      }

      getState(): Types.state {

      }

      /** Builds the components connectors */
      makeConnectors() {

      }

      insertInto(element?: SVGGraphicsElement) {

      }

      transferFunction() { return [] };
   }

   export class Schematic extends Base {
      draw() {
         //(Prepend so handles appear on top)
         this.group.prepend(drawSchematic(this, "body"));
      }
      getConnections(): Component.Types.connector[][][] {
         return Generics.getComponentConnections(this, manifest.schematic);
      }
   }

   export class Layout extends Base {
      draw() {
         //(Prepend so handles appear on top)
         this.group.prepend(drawLayout(this, "body"));
      }
      getConnections(): Component.Types.connector[][][] {
         return Generics.getComponentConnections(this, manifest.layout);
      }
   }
}
