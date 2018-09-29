namespace Circuit.Component._Wire.Classes {

   abstract class Base extends Component.Instance implements Types.properties {
      getProperties(): Types.properties {
         return Utility.deepCopy({
            name: this.name
         });
      }

      transferFunction(from: Component.Types.connector): Component.Types.connector[] {
         return Utility.flatten2d(this.connectorSets.map(connectorSet => connectorSet.filter(Utility.isNot(from))));
      }
   }

   export class Schematic extends Base implements Types.valuesSchematic {
      joints: Vector[];
      connectorSets: Component.Types.node[][] = [];

      constructor(values: Types.valuesSchematic) {
         super(values);
         this.joints = values.joints;
      }

      getState(): Types.stateSchematic {
         return Utility.deepCopy({
            joints: this.joints,
            disabled: this.disabled
         });
      }

      draw() {
         //(Prepend so handles appear on top)
         this.group.prepend(drawSchematic(this));
      }

      insertInto(element?: SVGGraphicsElement) {
         Utility.Insert.first(this.group.element, element);
      }

      makeConnectors() {
         const end1 = this.joints[0];
         const end2 = this.joints[this.joints.length - 1];

         this.connectorSets = [[
            Component.Generics.makeConnector(this, "", "node", end1),
            Component.Generics.makeConnector(this, "", "node", end2)]
         ]
      }

      getConnections(): Component.Types.connector[][][] {
         return Generics.getComponentConnections(this, manifest.schematic);
      }

   }

   export class Layout extends Base implements Types.valuesLayout {
      joints: Vector[];
      color: string;

      constructor(values: Types.valuesLayout) {
         super(values);
         this.joints = values.joints;
         this.color = values.color;
      }


      getState(): Types.stateLayout {
         return Utility.deepCopy({
            joints: this.joints,
            color: this.color,
            disabled: this.disabled
         });
      }

      draw() {
         //(Prepend so handles appear on top)
         this.group.prepend(drawLayout(this));
      }

      insertInto(element?: SVGGraphicsElement) {
         Utility.Insert.last(this.group.element, element);
      }

      makeConnectors() {
         this.connectorSets = [[
            Component.Generics.makeConnector(this, "", "pin", this.joints[0]),
            Component.Generics.makeConnector(this, "", "pin", this.joints[this.joints.length - 1]),]
         ]
      }

      getConnections(): Component.Types.connector[][][] {
         return Generics.getComponentConnections(this, manifest.layout);
      }
   }
}
