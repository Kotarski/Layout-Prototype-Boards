namespace Circuit.Component._Stripboard {
   export namespace Types {
      export interface trackBreak { track: number, hole: number }

      export interface properties extends Component.Types.properties {
         rows: number;
         columns: number;
      }
      export interface state extends Component.Types.state {
         joints: [Vector, Vector];
         trackBreaks: trackBreak[];
      }

      export type values = properties & state;
   }
}

