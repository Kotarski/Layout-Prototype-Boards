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
            $(this.group.element).addClass("component " + this.name);
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
               location: this.location,
               isDual: this.isDual
            }
         }

         draw() {
            this.group.prepend(Svg.Element.Group.OpAmp.Layout.make(this.isDual, "body"))
         }

         makeConnectors() {
            let gridSpacing = Constants.gridSpacing;
            if (this.isDual) {
               let gridSpacing = Constants.gridSpacing;
               // Note that the power selectors physically occupy the same space.
               this.connectorSets = [[
                  Component.Generics.makeConnector(this, "vcc+", "pin", { x: 0 * gridSpacing, y: 0 * gridSpacing }, "v+"),//8
                  Component.Generics.makeConnector(this, "out", "pin", { x: 1 * gridSpacing, y: 0 * gridSpacing }, "1o"),//7
                  Component.Generics.makeConnector(this, "in-", "pin", { x: 2 * gridSpacing, y: 0 * gridSpacing }, "1i-"),//6
                  Component.Generics.makeConnector(this, "in+", "pin", { x: 3 * gridSpacing, y: 0 * gridSpacing }, "1i+"),//5
                  Component.Generics.makeConnector(this, "vcc-", "pin", { x: 3 * gridSpacing, y: 3 * gridSpacing }, "v-"),//4
               ], [
                  Component.Generics.makeConnector(this, "vcc+", "pin", { x: 0 * gridSpacing, y: 0 * gridSpacing }, "v+"),//8
                  Component.Generics.makeConnector(this, "out", "pin", { x: 0 * gridSpacing, y: 3 * gridSpacing }, "2o"),//1
                  Component.Generics.makeConnector(this, "in-", "pin", { x: 1 * gridSpacing, y: 3 * gridSpacing }, "2i-"),//2
                  Component.Generics.makeConnector(this, "in+", "pin", { x: 2 * gridSpacing, y: 3 * gridSpacing }, "2i+"),//3
                  Component.Generics.makeConnector(this, "vcc-", "pin", { x: 3 * gridSpacing, y: 3 * gridSpacing }, "v-"),//4
               ]];
            } else {
               this.connectorSets = [[
                  //Component.Generics.makeConnector(this, "nc", "pin", { x: 0 * gridSpacing, y: 0 * gridSpacing }),//8
                  Component.Generics.makeConnector(this, "vcc+", "pin", { x: 1 * gridSpacing, y: 0 * gridSpacing }, "v+"),//7
                  Component.Generics.makeConnector(this, "out", "pin", { x: 2 * gridSpacing, y: 0 * gridSpacing }, "o"),//6
                  //Component.Generics.makeConnector(this, "offset n1", "pin", { x: 3 * gridSpacing, y: 0 * gridSpacing }),//5
                  //Component.Generics.makeConnector(this, "offset n2", "pin", { x: 0 * gridSpacing, y: 3 * gridSpacing }),//1
                  Component.Generics.makeConnector(this, "in-", "pin", { x: 1 * gridSpacing, y: 3 * gridSpacing }, "i-"),//2
                  Component.Generics.makeConnector(this, "in+", "pin", { x: 2 * gridSpacing, y: 3 * gridSpacing }, "i+"),//3
                  Component.Generics.makeConnector(this, "vcc-", "pin", { x: 3 * gridSpacing, y: 3 * gridSpacing }, "v-"),//4
               ]];
            }

         }

         replaceWithDual() {
            this.isDual = true;
            this.group.clearChildren();
            this.draw();
            this.makeConnectors();
         }

         transferFunction() { return [] };

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
            $(component.group.element).addClass("component " + component.name);
            Addins.Draggable.init(component);
            Addins.Rotatable.init(component, { x: Constants.gridSpacing * 1.5, y: Constants.gridSpacing * 1.5 });
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