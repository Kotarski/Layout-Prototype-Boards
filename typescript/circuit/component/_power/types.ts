namespace Circuit.Component._Power {
   export namespace Types {
      export interface properties extends Component.Types.properties {
         voltage: number;
      }

      export interface state extends Component.Types.state {
         joints: [Vector];
      }


      export type values = properties & state;
   }
}

