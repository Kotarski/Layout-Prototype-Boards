namespace Circuit.Component._Bipolar.Classes {

   abstract class Base extends Component.Instance implements Types.values {
      currentGain: number;
      type: "NPN" | "PNP"
      joints: [Vector, Vector, Vector];
      constructor(values: Types.values) {
         super(values);
         $(this.group.element).addClass("component " + this.name);
         this.joints = values.joints;
         this.type = values.type;
         this.currentGain = values.currentGain;
      }

      getProperties(): Types.properties {
         return Utility.deepCopy({
            name: this.name,
            currentGain: this.currentGain,
            type: this.type
         });
      }

      getState(): Types.state {
         return Utility.deepCopy({
            joints: this.joints,
            disabled: this.disabled
         });
      }

      /** Builds the components connectors */
      makeConnectors() {
         this.connectorSets = [[
            Generics.makeConnector(this, "emitter", "pin", this.joints[INDEXEMITTER], "e"),
            Generics.makeConnector(this, "collector", "pin", this.joints[INDEXCOLLECTOR], "c"),
            Generics.makeConnector(this, "base", "pin", this.joints[INDEXBASE], "b")
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
