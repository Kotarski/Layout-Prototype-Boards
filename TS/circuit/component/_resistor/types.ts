namespace Circuit.Component._Resistor {
   export namespace Types {
      export interface properties extends Component.Types.properties {
         resistance: number;
      }

      export interface state extends Component.Types.state {
         joints: [Vector, Vector];
      }

      export type values = properties & state;
   }
}

