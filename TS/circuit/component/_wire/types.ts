namespace Circuit.Component._Wire {
   export namespace Types {
      export interface properties extends Component.Types.properties { }

      export interface stateSchematic extends Component.Types.state {
         joints: Vector[];
      }

      export interface stateLayout extends Component.Types.state {
         joints: Vector[];
         color: string;
      }

      export type valuesSchematic = properties & stateSchematic;
      export type valuesLayout = properties & stateLayout;
   }
}

