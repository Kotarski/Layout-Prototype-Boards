namespace Circuit.Component._Diode {
   export namespace Types {
      export interface properties extends Component.Types.properties {
         breakdownVoltage: number;
         saturationCurrent: number;
         color: string;
      }

      export interface state extends Component.Types.state {
         joints: [Vector, Vector];
      }

      export type values = properties & state;
   }
}

