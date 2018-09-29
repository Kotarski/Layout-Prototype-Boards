namespace Circuit.Component._Stripboard.Classes {


   export class Layout extends Component.Instance implements Types.values {
      tracks: Addins.Board.Track.Instance[] = [];
      connectorSets: Component.Types.hole[][] = [];
      trackBreaks: Types.trackBreak[];
      rows: number;
      columns: number;
      joints: [Vector, Vector];

      constructor(values: Types.properties & Types.state) {
         super(values);
         this.rows = values.rows;
         this.columns = values.columns;
         this.trackBreaks = values.trackBreaks;
         this.joints = values.joints;
      }

      getProperties(): Types.properties {
         return Utility.deepCopy({
            name: this.name,
            rows: this.rows,
            columns: this.columns
         });
      }

      getState(): Types.state {
         return Utility.deepCopy({
            joints: this.joints,
            disabled: this.disabled,
            trackBreaks: this.trackBreaks
         });
      }

      makeConnectors() {
         this.tracks.forEach(track => track.makeConnectors());
         this.tracks.forEach((track, trackIdx) => {
            let trackBreaks = this.trackBreaks.filter(trackBreak => trackBreak.track === trackIdx);
            track.connectorSets[0].forEach((hole, holeIdx) => {
               if (trackBreaks.some(trackBreak => trackBreak.hole === holeIdx)) {
                  hole.type = "brokenhole";
               }
            });
         })
      }

      draw() {

         let rotation = vector(this.joints[0]).getAngleTo(this.joints[1]);
         this.tracks = makeTracks(this)


         const gS = Constants.gridSpacing;
         //const centre = { x: (this.columns - 1) * gS / 2, y: (this.rows - 1) * gS / 2 };
         const size = { width: (this.columns + 0.5) * gS, height: (this.rows + 0.5) * gS };
         const cornerRounding = { x: 3, y: 3 };

         this.group.append(
            Svg.Element.Rect.make(vector(0), size, cornerRounding, "body highlight").translate(this.joints[0]).rotate(rotation),
            this.tracks.map(t => t.group)
         );

      }

      getConnections(): Component.Types.connector[][][] {
         return Generics.getComponentConnections(this, manifest.layout);
      }

      insertInto(element?: SVGGraphicsElement) {
         Utility.Insert.first(this.group.element, element);
      }

      transferFunction() { return [] };
   }
}
