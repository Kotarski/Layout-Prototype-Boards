namespace Circuit.Component._OpAmp {
   export namespace Types {
      export interface properties extends Component.Types.properties {
         offsetVoltage: number;
      }

      export interface stateSchematic extends Component.Types.state {
         joints: [Vector, Vector, Vector, Vector, Vector];
      }

      export interface stateLayout extends Component.Types.state {
         isDual: boolean;
         joints: [Vector, Vector];
      }

      export type valuesSchematic = properties & stateSchematic;
      export type valuesLayout = properties & stateLayout;
   }
}

