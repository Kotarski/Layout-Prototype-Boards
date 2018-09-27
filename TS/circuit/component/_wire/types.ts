namespace Circuit.Component._Wire {
   export namespace Types {
      export interface properties extends Component.Types.properties { }

      export interface state extends Component.Types.state {
         joints: Vector[];
      }

      export type values = properties & state;
   }
}

