namespace Circuit.Component._Breadboard.Classes {

   abstract class Base extends Component.Instance implements Types.values {
      joints: [Vector, Vector];
      tracks: Addins.Board.Track.Instance[] = [];
      connectorSets: Component.Types.hole[][] = [];

      constructor(values: Types.values) {
         super(values);
         this.joints = values.joints
      }

      getProperties(): Types.properties {
         return Utility.deepCopy({
            name: this.name,
         });
      }

      getState(): Types.state {
         return Utility.deepCopy({
            joints: this.joints,
            disabled: this.disabled
         });
      }

      // Handled in the tracks
      makeConnectors() { }

      insertInto(element?: SVGGraphicsElement) {
         Utility.Insert.first(this.group.element, element);
      }

      transferFunction() { return [] };

      getConnections(): Component.Types.connector[][][] {
         return Generics.getComponentConnections(this, manifest.layout);
      }
   }

   export class Small extends Base {
      draw() {
         this.tracks = makeTracks(this, "small");
         //(Prepend so handles appear on top)
         this.group.prepend(drawSmall(this), this.tracks.map(t => t.group));
      }
   }

   export class Large extends Base {
      draw() {
         this.tracks = makeTracks(this, "large");
         //(Prepend so handles appear on top)
         this.group.prepend(drawLarge(this), this.tracks.map(t => t.group));
      }
   }
}
