
namespace Circuit.Component {

   export namespace OpAmpSchematic {
      export type Instance = Local.Instance;
      export namespace Types {
         export interface properties extends Component.Types.properties {
            offsetVoltage: number;
         }

         export interface state extends Component.Types.state {
            orientation: "LR" | "RL";
            whichInputAtTop: "inverting" | "non-inverting";
         }

         export interface loadFunction extends Component.Types.loadFunction {
            (raw: any): (Instance | [PowerSchematic.Instance, PowerSchematic.Instance, Instance]);
         }

         export type Instance = Local.Instance;
      }
   }

   namespace Local {
      import Types = OpAmpSchematic.Types;

      export const defaultState: Types.state = {
         location: { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 },
         orientation: "LR",
         whichInputAtTop: "non-inverting"
      }
      export const defaultProperties: Types.properties = {
         name: "opAmp",
         offsetVoltage: 0
      }

      export class Instance extends Component.Instance implements Types.properties, Types.state {
         orientation: "LR" | "RL";
         whichInputAtTop: "inverting" | "non-inverting";
         offsetVoltage: number;

         constructor(properties: Types.properties, state: Types.state) {
            super(properties, state);
            this.group.addClasses("component " + this.name);
            this.orientation = state.orientation;
            this.whichInputAtTop = state.whichInputAtTop;
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
               orientation: this.orientation,
               whichInputAtTop: this.whichInputAtTop
            }
         }

         draw() {
            let inversionScale: Global.Types.vector = {
               X: (this.orientation === "LR") ? 1 : -1,
               Y: (this.whichInputAtTop === "non-inverting") ? 1 : -1
            };

            let bodyPath = "M-25 -25 L 25 0 L -25 25 L -25 -25 Z";

            this.group.append(new Svg.Elements.Graphics.Simples.Path(
               bodyPath, "highlight highlightwithfill extrathick").scale(inversionScale)
            );

            this.group.append(new Svg.Elements.Graphics.Simples.Path(
               bodyPath, "body white").scale(inversionScale)
            );

            //Plus
            this.group.append(new Svg.Elements.Graphics.Simples.Line(
               { X: -22, Y: -10 }, { X: -14, Y: -10 }, "line thin").scale(inversionScale)
            );
            this.group.append(new Svg.Elements.Graphics.Simples.Line(
               { X: -18, Y: -6 }, { X: -18, Y: -14 }, "line thin").scale(inversionScale)
            );

            //Minus
            this.group.append(new Svg.Elements.Graphics.Simples.Line(
               { X: -22, Y: +10 }, { X: -14, Y: +10 }, "line thin").scale(inversionScale)
            );

            //Leads
            this.group.append(new Svg.Elements.Graphics.Simples.Line(
               { X: -25, Y: -10 }, { X: -30, Y: -10 }, "line thin").scale(inversionScale)
            );
            this.group.append(new Svg.Elements.Graphics.Simples.Line(
               { X: -25, Y: 10 }, { X: -30, Y: 10 }, "line thin").scale(inversionScale)
            );
            this.group.append(new Svg.Elements.Graphics.Simples.Line(
               { X: 25, Y: 0 }, { X: 40, Y: 0 }, "line thin").scale(inversionScale)
            );
         }

         makeConnectors() {

            let nonInvertingY = (this.whichInputAtTop === "non-inverting") ? -10 : 10;

            this.connectorSets = [
               [//Component.Generics.makeConnector(this, "nc", "node", {???}),//8
                  Component.Generics.makeConnector(this, "vcc+", "node", { X: 0, Y: -12 }),//7
                  Component.Generics.makeConnector(this, "out", "node", { X: 40, Y: 0 }),//6
                  //Component.Generics.makeConnector(this, "offset n1", "node", {???}),//5
                  //Component.Generics.makeConnector(this, "offset n2", "node", {???}),//1
                  Component.Generics.makeConnector(this, "in-", "node", { X: -30, Y: -nonInvertingY }),//2
                  Component.Generics.makeConnector(this, "in+", "node", { X: -30, Y: nonInvertingY }),//3
                  Component.Generics.makeConnector(this, "vcc-", "node", { X: 0, Y: 12 }),//4
               ]
            ];
         }

      }

      export const loadInstance: Component.Types.loadFunction = (raw: any): (Instance | [PowerSchematic.Instance, PowerSchematic.Instance, Instance]) => {
         let state: Global.Types.DeepPartial<typeof defaultState> = (raw.state) ?
            {
               orientation: (["LR", "RL"].includes(raw.state.orientation)) ? raw.state.orientation : undefined,
               whichInputAtTop: (["inverting", "non-inverting"].includes(raw.state.whichInputAtTop)) ? raw.state.whichInputAtTop : undefined,
               location: raw.state.location
            } : {
               orientation: (["LR", "RL"].includes(raw.orientation)) ? raw.orientation : undefined,
               whichInputAtTop: (["inverting", "non-inverting"].includes(raw.whichInputAtTop)) ? raw.whichInputAtTop : undefined,
               location: (raw.where) ? {
                  e: raw.where.X,
                  f: raw.where.Y
               } : undefined,
            };

         let properties: Global.Types.DeepPartial<typeof defaultProperties> = (raw.properties) ?
            {
               name: raw.properties.name,
               offsetVoltage: raw.properties.offsetVoltage,
            } : {
               offsetVoltage: raw.offsetVoltage,
            };

         if ((raw.minOutput) && (raw.maxOutput)) {
            // Also create the power leads
            let topPower = PowerSchematic.makeInstance(
               { voltage: raw.maxOutput || 5 }, { location: state.location }, true
            );
            topPower.group.translate({ X: 0, Y: -22 });

            let bottomPower = PowerSchematic.makeInstance(
               { voltage: raw.minOutput || -5 }, { location: state.location }, true
            );
            bottomPower.group.translate({ X: 0, Y: 22 });

            let opAmp = makeInstance(properties, state, true);

            let instances: [PowerSchematic.Instance, PowerSchematic.Instance, Instance] = [
               topPower,
               bottomPower,
               opAmp,
            ];

            return instances
         } else {
            return makeInstance(properties, state, true);
         }
      }

      export const makeInstance = Generics.getMaker(Instance, defaultProperties, defaultState,
         (component: Instance) => {
            component.group.addClasses("component " + component.name);
            Addins.Selectable.init(component);
            Addins.ConnectionHighlights.init(component, false);
         }
      );
   }

   export const OpAmpSchematic = {
      defaultState: Local.defaultState,
      defaultProperties: Local.defaultProperties,
      Instance: Local.Instance,
      makeInstance: Local.makeInstance,
      loadInstance: Local.loadInstance
   }
}