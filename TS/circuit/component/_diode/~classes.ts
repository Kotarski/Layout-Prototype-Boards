namespace Circuit.Component._Diode.Classes {

   abstract class Base extends Component.Instance implements Types.values {
      breakdownVoltage: number;
      saturationCurrent: number;
      joints: [Vector, Vector];
      color: string;

      constructor(values: Types.values) {
         super(values);
         this.joints = values.joints;
         this.saturationCurrent = values.saturationCurrent;
         this.breakdownVoltage = values.breakdownVoltage;
         this.color = values.color;
      }

      getProperties(): Types.properties {
         return Utility.deepCopy({
            name: this.name,
            breakdownVoltage: this.breakdownVoltage,
            saturationCurrent: this.saturationCurrent,
            color: this.color
         });
      }

      getState(): Types.state {
         return Utility.deepCopy({
            joints: this.joints,
            disabled: this.disabled
         });
      }

      makeConnectors() {
         this.connectorSets = [[
            Component.Generics.makeConnector(this, "anode", "node", this.joints[0], "+"),
            Component.Generics.makeConnector(this, "cathode", "node", this.joints[1], "-"),
         ]];
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
   }

   export class Layout extends Base {
      draw() {
         //(Prepend so handles appear on top)
         this.group.prepend(drawLayout(this));
      }
      getConnections(): Component.Types.connector[][][] {
         return Generics.getComponentConnections(this, manifest.layout);
      }
   }
}
