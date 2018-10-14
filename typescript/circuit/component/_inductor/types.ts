namespace Circuit.Component._Inductor {
   export namespace Types {
      export interface properties extends Component.Types.properties {
         inductance: number;
      }

      export interface state extends Component.Types.state {
         joints: [Vector, Vector];
      }

      export type values = properties & state;
   }
}

