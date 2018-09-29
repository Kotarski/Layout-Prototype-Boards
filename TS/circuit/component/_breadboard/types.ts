namespace Circuit.Component._Breadboard {
   export namespace Types {
      export interface properties extends Component.Types.properties {

      }

      export interface state extends Component.Types.state {
         joints: [Vector, Vector];
      }

      export type values = properties & state;
   }
}

