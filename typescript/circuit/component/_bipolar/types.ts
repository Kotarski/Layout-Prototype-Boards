namespace Circuit.Component._Bipolar {
   export namespace Types {
      export interface properties extends Component.Types.properties {
         currentGain: number;
         type: "PNP" | "NPN";
      }

      export interface state extends Component.Types.state {
         joints: [Vector, Vector, Vector];
      }

      export type values = properties & state;
   }
}

