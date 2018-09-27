namespace Circuit.Component._OpAmp.Classes {

   abstract class Base extends Component.Instance implements Types.properties {
      offsetVoltage: number;

      constructor(values: Types.valuesSchematic | Types.valuesLayout) {
         super(values);
         this.offsetVoltage = values.offsetVoltage;
      }

      getProperties(): Types.properties {
         return Utility.deepCopy({
            name: this.name,
            offsetVoltage: this.offsetVoltage
         });
      }

      abstract getState(): Types.stateLayout | Types.stateSchematic;

      insertInto(element?: SVGGraphicsElement) {

      }

      transferFunction() { return [] };
   }

   export class Schematic extends Base implements Types.valuesSchematic {
      joints: [Vector, Vector, Vector, Vector, Vector];
      constructor(values: Types.valuesSchematic) {
         super(values);
         this.offsetVoltage = values.offsetVoltage;
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
      getConnections(): Component.Types.connector[][][] {
         return Generics.getComponentConnections(this, manifest.schematic);
      }
      makeConnectors() {

         let [posPower, negPower] = (this.joints[INDEXPOW1].y < this.joints[INDEXPOW2].y)
            ? [this.joints[INDEXPOW1], this.joints[INDEXPOW2]]
            : [this.joints[INDEXPOW2], this.joints[INDEXPOW1]];

         this.connectorSets = [[
            // The ordering here is important so the colors line up between layout and schematic
            Component.Generics.makeConnector(this, "vcc+", "node", posPower, "v+"),              //7
            Component.Generics.makeConnector(this, "out", "node", this.joints[INDEXOUT], "o"),   //6
            Component.Generics.makeConnector(this, "in-", "node", this.joints[INDEXINNEG], "i-"),//2
            Component.Generics.makeConnector(this, "in+", "node", this.joints[INDEXINPOS], "i+"),//3
            Component.Generics.makeConnector(this, "vcc-", "node", negPower, "v-"),              //4
            //Component.Generics.makeConnector(this, "nc", "node", {???}),                       //8
            //Component.Generics.makeConnector(this, "offset n1", "node", {???}),                //5
            //Component.Generics.makeConnector(this, "offset n2", "node", {???}),                //1
         ]];
      }
   }

   export class Layout extends Base implements Types.valuesLayout {
      isDual: boolean;
      joints: [Vector, Vector];
      constructor(values: Types.valuesLayout) {
         super(values);
         this.offsetVoltage = values.offsetVoltage;
         this.isDual = values.isDual;
         this.joints = values.joints;
      }
      getState(): Types.stateLayout {
         return Utility.deepCopy({
            isDual: this.isDual,
            joints: this.joints,
            disabled: this.disabled
         });
      }
      draw() {
         //(Prepend so handles appear on top)
         this.group.prepend(drawLayout(this));
      }
      getConnections(): Component.Types.connector[][][] {
         return Generics.getComponentConnections(this, manifest.layout);
      }
      makeConnectors() {
         let gs = Constants.gridSpacing;

         let c = this.joints[INDEXCENTRE];
         let r = vector(this.joints[INDEXCENTRE]).getAngleTo(this.joints[INDEXROTATION]);

         let connectorPoints = vector([
            { x: 0 * gs, y: 3 * gs },//1
            { x: 1 * gs, y: 3 * gs },//2
            { x: 2 * gs, y: 3 * gs },//3
            { x: 3 * gs, y: 3 * gs },//4
            { x: 3 * gs, y: 0 * gs },//5
            { x: 2 * gs, y: 0 * gs },//6
            { x: 1 * gs, y: 0 * gs },//7
            { x: 0 * gs, y: 0 * gs } //8
         ]).sumWith(vector(-30)).rotate(r).sumWith(c).vectors;


         if (this.isDual) {
            // Note that the power selectors physically occupy the same space.
            this.connectorSets = [[
               Component.Generics.makeConnector(this, "vcc+", "pin", connectorPoints[7], "v+"),  //8
               Component.Generics.makeConnector(this, "out", "pin", connectorPoints[6], "1o"),   //7
               Component.Generics.makeConnector(this, "in-", "pin", connectorPoints[5], "1i-"),  //6
               Component.Generics.makeConnector(this, "in+", "pin", connectorPoints[4], "1i+"),  //5
               Component.Generics.makeConnector(this, "vcc-", "pin", connectorPoints[3], "v-"),  //4
            ], [
               Component.Generics.makeConnector(this, "vcc+", "pin", connectorPoints[7], "v+"),  //8
               Component.Generics.makeConnector(this, "out", "pin", connectorPoints[0], "2o"),   //1
               Component.Generics.makeConnector(this, "in-", "pin", connectorPoints[1], "2i-"),  //2
               Component.Generics.makeConnector(this, "in+", "pin", connectorPoints[2], "2i+"),  //3
               Component.Generics.makeConnector(this, "vcc-", "pin", connectorPoints[3], "v-"),  //4
            ]];
         } else {
            this.connectorSets = [[
               // The ordering here is important so the colors line up between layout and schematic
               Component.Generics.makeConnector(this, "vcc+", "pin", connectorPoints[6], "v+"),  //7
               Component.Generics.makeConnector(this, "out", "pin", connectorPoints[5], "o"),    //6
               Component.Generics.makeConnector(this, "in-", "pin", connectorPoints[1], "i-"),   //2
               Component.Generics.makeConnector(this, "in+", "pin", connectorPoints[2], "i+"),   //3
               Component.Generics.makeConnector(this, "vcc-", "pin", connectorPoints[3], "v-"),  //4
               Component.Generics.makeConnector(this, "nc", "pin", connectorPoints[7], "nc"),    //8
               Component.Generics.makeConnector(this, "offset n1", "pin", connectorPoints[4], "nc"), //5
               Component.Generics.makeConnector(this, "offset n2", "pin", connectorPoints[0], "nc"), //1
            ]];
         }

      }
      replaceWithDual() {
         this.isDual = true;
         this.group.clearChildren();
         this.draw();
         this.makeConnectors();
      }

   }
}
