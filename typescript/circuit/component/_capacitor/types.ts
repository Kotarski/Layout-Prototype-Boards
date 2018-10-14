namespace Circuit.Component._Capacitor {
   export namespace Types {
      export interface properties extends Component.Types.properties {
         capacitance: number;
         isPolarised: boolean
      }

      export interface state extends Component.Types.state {
         joints: [Vector, Vector];
      }

      export type values = properties & state;
   }
}

