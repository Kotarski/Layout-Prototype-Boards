namespace Circuit.Component._Track {
   export namespace Types {
      export interface properties extends Component.Types.properties {
         holeSpacings: number[];
         style: "breadboard" | "stripboard";
      }

      export interface state extends Component.Types.state {
         joints: [Vector, Vector];
      }

      export type values = properties & state;
   }
}

