namespace Circuit.Component._Capacitor.Classes {

   abstract class Base extends Component.Instance implements Types.values {
      capacitance: number;
      isPolarised: boolean;
      joints: [Vector, Vector];

      constructor(values: Types.values) {
         super(values);
         this.joints = values.joints;
         this.capacitance = values.capacitance;
         this.isPolarised = values.isPolarised;
      }

      getProperties(): Types.properties {
         return Utility.deepCopy({
            name: this.name,
            capacitance: this.capacitance,
            isPolarised: this.isPolarised
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
         if (this.isPolarised) {
            this.connectorSets = [[
               Component.Generics.makeConnector(this, "cathode", "node", this.joints[INDEXCATHODE], "-"),
               Component.Generics.makeConnector(this, "anode", "node", this.joints[INDEXANODE], "+"),
            ]]
         } else {
            this.connectorSets = [[
               Component.Generics.makeConnector(this, "", "node", this.joints[INDEXCATHODE]),
               Component.Generics.makeConnector(this, "", "node", this.joints[INDEXANODE]),
            ]]
         }
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
         if (this.isPolarised) {
            this.connectorSets = [[
               Component.Generics.makeConnector(this, "cathode", "pin", this.joints[INDEXCATHODE], "-"),
               Component.Generics.makeConnector(this, "anode", "pin", this.joints[INDEXANODE], "+"),
            ]]
         } else {
            this.connectorSets = [[
               Component.Generics.makeConnector(this, "", "pin", this.joints[INDEXCATHODE]),
               Component.Generics.makeConnector(this, "", "pin", this.joints[INDEXANODE]),
            ]]
         }
      }
   }
}
