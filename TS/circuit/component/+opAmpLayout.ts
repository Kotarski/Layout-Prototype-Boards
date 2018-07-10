namespace Circuit.Component {

   export namespace OpAmpLayout {
      export type Instance = Local.Instance;
      export namespace Types {
         export type properties = OpAmpSchematic.Types.properties;

         export interface state extends Component.Types.state {
            isDual: boolean;
         }

         export interface loadFunction extends Component.Types.loadFunction {
            (raw: any): Instance;
         }

         export type Instance = Local.Instance;
      }
   }

   namespace Local {
      import Types = OpAmpLayout.Types;

      export const defaultState: Types.state = {
         location: { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 },
         isDual: false
      }
      export const defaultProperties: Types.properties = {
         name: "opAmp",
         offsetVoltage: 0
      }

      export class Instance extends Component.Instance implements Types.properties, Types.state {
         isDual: boolean;
         offsetVoltage: number;

         constructor(properties: Types.properties, state: Types.state) {
            super(properties, state);
            this.group.addClasses("component " + this.name);
            this.isDual = state.isDual;
            this.offsetVoltage = properties.offsetVoltage;
         }

         getProperties(): Types.properties {
            return {
               name: this.name,
               offsetVoltage: this.offsetVoltage
            }
         }

         getState(): Types.state {
            return {
               location: this.group.transforms,
               isDual: this.isDual
            }
         }

         draw() {
            if (this.isDual) {
               this.group.append(new Svg.Elements.Graphics.Complexes.dip(4, "", "TL072", ""));
            } else {
               this.group.append(new Svg.Elements.Graphics.Complexes.dip(4, "", "TL071", ""));
            }
         }

         makeConnectors() {
            let gridSpacing = Constants.gridSpacing;
            if (this.isDual) {
               let gridSpacing = Constants.gridSpacing;
               // Note that the power selectors physically occupy the same space.
               this.connectorSets = [[
                  Component.Generics.makeConnector(this, "vcc+", "pin", { X: 0 * gridSpacing, Y: 0 * gridSpacing }),//8
                  Component.Generics.makeConnector(this, "out", "pin", { X: 1 * gridSpacing, Y: 0 * gridSpacing }),//7
                  Component.Generics.makeConnector(this, "in-", "pin", { X: 2 * gridSpacing, Y: 0 * gridSpacing }),//6
                  Component.Generics.makeConnector(this, "in+", "pin", { X: 3 * gridSpacing, Y: 0 * gridSpacing }),//5
                  Component.Generics.makeConnector(this, "vcc-", "pin", { X: 3 * gridSpacing, Y: 3 * gridSpacing }),//4
               ], [
                  Component.Generics.makeConnector(this, "vcc+", "pin", { X: 0 * gridSpacing, Y: 0 * gridSpacing }),//8
                  Component.Generics.makeConnector(this, "out", "pin", { X: 0 * gridSpacing, Y: 3 * gridSpacing }),//1
                  Component.Generics.makeConnector(this, "in-", "pin", { X: 1 * gridSpacing, Y: 3 * gridSpacing }),//2
                  Component.Generics.makeConnector(this, "in+", "pin", { X: 2 * gridSpacing, Y: 3 * gridSpacing }),//3
                  Component.Generics.makeConnector(this, "vcc-", "pin", { X: 3 * gridSpacing, Y: 3 * gridSpacing }),//4
               ]];
            } else {
               this.connectorSets = [[
                  //Component.Generics.makeConnector(this, "nc", "pin", { X: 0 * gridSpacing, Y: 0 * gridSpacing }),//8
                  Component.Generics.makeConnector(this, "vcc+", "pin", { X: 1 * gridSpacing, Y: 0 * gridSpacing }),//7
                  Component.Generics.makeConnector(this, "out", "pin", { X: 2 * gridSpacing, Y: 0 * gridSpacing }),//6
                  //Component.Generics.makeConnector(this, "offset n1", "pin", { X: 3 * gridSpacing, Y: 0 * gridSpacing }),//5
                  //Component.Generics.makeConnector(this, "offset n2", "pin", { X: 0 * gridSpacing, Y: 3 * gridSpacing }),//1
                  Component.Generics.makeConnector(this, "in-", "pin", { X: 1 * gridSpacing, Y: 3 * gridSpacing }),//2
                  Component.Generics.makeConnector(this, "in+", "pin", { X: 2 * gridSpacing, Y: 3 * gridSpacing }),//3
                  Component.Generics.makeConnector(this, "vcc-", "pin", { X: 3 * gridSpacing, Y: 3 * gridSpacing }),//4
               ]];
            }

         }

         replaceWithDual() {
            this.isDual = true;
            this.group.clear();
            this.draw();
            this.makeConnectors();
         }

      }

      export const loadInstance: Component.Types.loadFunction = (raw: any): Instance => {
         let state: Global.Types.DeepPartial<typeof defaultState> = (raw.state) ?
            {
               location: raw.state.location,
               isDual: raw.state.isDual
            } : {};
         let properties: Global.Types.DeepPartial<typeof defaultProperties> = (raw.properties) ?
            {
               name: raw.properties.name,
               offsetVoltage: raw.properties.offsetVoltage,
            } : {};

         return makeInstance(properties, state, true);
      }

      export const makeInstance = getMaker(Instance, defaultProperties, defaultState,
         (component: Instance) => {
            component.group.addClasses("component " + component.name);
            Addins.Draggable.init(component);
            Addins.Rotatable.init(component, { X: Constants.gridSpacing * 1.5, Y: Constants.gridSpacing * 1.5 });
            Addins.Selectable.init(component);
            Addins.ConnectionHighlights.init(component);
         }
      );
   }

   export const OpAmpLayout = {
      defaultState: Local.defaultState,
      defaultProperties: Local.defaultProperties,
      Instance: Local.Instance,
      makeInstance: Local.makeInstance,
      loadInstance: Local.loadInstance
   }
}