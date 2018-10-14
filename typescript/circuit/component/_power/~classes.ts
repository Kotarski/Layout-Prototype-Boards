namespace Circuit.Component._Power.Classes {

   abstract class Base extends Component.Instance implements Types.values {
      voltage: number;
      joints: [Vector];

      constructor(values: Types.values) {
         super(values);
         this.voltage = values.voltage;
         this.joints = values.joints;
      }

      getProperties(): Types.properties {
         return Utility.deepCopy({
            name: this.name,
            voltage: this.voltage
         });
      }

      getState(): Types.state {
         return Utility.deepCopy({
            joints: this.joints,
            disabled: this.disabled
         });
      }

      transferFunction() { return [] };
   }

   export class Schematic extends Base {
      insertInto(element?: SVGGraphicsElement) {
         Utility.Insert.last(this.group.element, element);
      }

      /** Builds and draws the components connectors */
      makeConnectors() {
         this.connectorSets = [
            [Component.Generics.makeConnector(this, "", "node", this.joints[0])]
         ]
      }

      draw() {
         //(Prepend so handles appear on top)
         this.group.prepend(drawSchematic(this));
      }

      getConnections(): Component.Types.connector[][][] {
         return Generics.getComponentConnections(this, manifest.schematic);
      }
   }

   export class Layout extends Base {
      connectorSets: Component.Types.hole[][] = [];

      insertInto(element?: SVGGraphicsElement) {
         Utility.Insert.after(this.group.element, element, ".board");
      }

      /** Builds and draws the components connectors */
      makeConnectors() {
         this.connectorSets = [[
            Component.Generics.makeConnector(this, "", "hole", this.joints[0])
         ]]
      }

      draw() {
         //(Prepend so handles appear on top)
         this.group.prepend(drawLayout(this));
      }

      getConnections(): Component.Types.connector[][][] {
         return Generics.getComponentConnections(this, manifest.layout);
      }
   }
}
