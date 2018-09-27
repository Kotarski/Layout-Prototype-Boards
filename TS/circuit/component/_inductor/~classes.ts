namespace Circuit.Component._Inductor.Classes {

   abstract class Base extends Component.Instance implements Types.values {
      inductance: number;
      joints: [Vector, Vector];

      constructor(values: Types.values) {
         super(values);
         this.joints = values.joints;
         this.inductance = values.inductance;
      }

      getProperties(): Types.properties {
         return Utility.deepCopy({
            name: this.name,
            inductance: this.inductance,
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
            Component.Generics.makeConnector(this, "", "pin", this.joints[0]),
            Component.Generics.makeConnector(this, "", "pin", this.joints[1]),
         ]]
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
