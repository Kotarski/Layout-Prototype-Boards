namespace Circuit.Component._Resistor.Classes {

   abstract class Base extends Component.Instance implements Types.values {
      resistance: number;
      joints: [Vector, Vector];

      constructor(values: Types.values) {
         super(values);
         this.joints = values.joints;
         this.resistance = values.resistance;
      }

      getProperties(): Types.properties {
         return Utility.deepCopy({
            name: this.name,
            resistance: this.resistance
         });
      }

      getState(): Types.state {
         return Utility.deepCopy({
            joints: this.joints,
            disabled: this.disabled
         });
      }

      insertInto(element?: SVGGraphicsElement) {
         Utility.Insert.last(this.group.element, element);
      }

      transferFunction() { return [] };
   }

   export class Schematic extends Base {
      draw() {
         //(Prepend so handles appear on top)
         this.group.prepend(drawSchematic(this));
      }
      getConnections(): Component.Types.connector[][][] {
         return Generics.getComponentConnections(this, manifest.schematic);
      }
      makeConnectors() {
         this.connectorSets = [
            [Component.Generics.makeConnector(this, "", "node", this.joints[INDEXEND1]),
            Component.Generics.makeConnector(this, "", "node", this.joints[INDEXEND2]),]
         ]
      }
   }

   export class Layout extends Base {
      draw() {
         //(Prepend so handles appear on top)
         this.group.prepend(drawLayout(this));
      }
      getConnections(): Component.Types.connector[][][] {
         return Generics.getComponentConnections(this, manifest.layout);
      }
      makeConnectors() {
         this.connectorSets = [
            [Component.Generics.makeConnector(this, "", "pin", this.joints[INDEXEND1]),
            Component.Generics.makeConnector(this, "", "pin", this.joints[INDEXEND2]),]
         ]
      }
   }
}
