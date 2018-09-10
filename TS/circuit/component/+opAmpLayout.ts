namespace Circuit.Component {

   export namespace OpAmpLayout {
      export type Instance = Local.Instance;
      export namespace Types {
         export type properties = OpAmpSchematic.Types.properties;

         export interface state extends Component.Types.state {
            isDual: boolean;
            joints: [Vector, Vector];
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
         isDual: false,
         joints: [{ x: 30, y: 30 }, { x: 40, y: 30 }],
         disabled: false
      }
      export const defaultProperties: Types.properties = {
         name: "opAmp",
         offsetVoltage: 0
      }

      export class Instance extends Component.Instance implements Types.properties, Types.state {
         isDual: boolean;
         offsetVoltage: number;
         joints: [Vector, Vector];

         constructor(properties: Types.properties, state: Types.state) {
            super(properties, state);
            $(this.group.element).addClass("component " + this.name);
            this.isDual = state.isDual;
            this.joints = state.joints;
            this.offsetVoltage = properties.offsetVoltage;
         }

         getProperties(): Types.properties {
            return Utility.deepCopy({
               name: this.name,
               offsetVoltage: this.offsetVoltage
            });
         }

         getState(): Types.state {
            return Utility.deepCopy({
               isDual: this.isDual,
               joints: this.joints,
               disabled: this.disabled
            });
         }

         draw() {
            this.group.prepend(Svg.Element.Group.OpAmp.Layout.make(this.isDual, this.joints[0], this.joints[1], "body"))
         }

         makeConnectors() {
            let gs = Constants.gridSpacing;

            let c = this.joints[0];
            let r = vector(this.joints[0]).getAngleTo(this.joints[1]);

            let connectorPoints = vector([
               { x: 0 * gs, y: 3 * gs },//1
               { x: 1 * gs, y: 3 * gs },//2
               { x: 2 * gs, y: 3 * gs },//3
               { x: 3 * gs, y: 3 * gs },//4
               { x: 3 * gs, y: 0 * gs },//5
               { x: 2 * gs, y: 0 * gs },//6
               { x: 1 * gs, y: 0 * gs },//7
               { x: 0 * gs, y: 0 * gs } //8
            ]).sumWith(vector(-30)).rotate(r).sumWith(c).vectors;


            if (this.isDual) {
               // Note that the power selectors physically occupy the same space.
               this.connectorSets = [[
                  Component.Generics.makeConnector(this, "vcc+", "pin", connectorPoints[7], "v+"),  //8
                  Component.Generics.makeConnector(this, "out", "pin", connectorPoints[6], "1o"),   //7
                  Component.Generics.makeConnector(this, "in-", "pin", connectorPoints[5], "1i-"),  //6
                  Component.Generics.makeConnector(this, "in+", "pin", connectorPoints[4], "1i+"),  //5
                  Component.Generics.makeConnector(this, "vcc-", "pin", connectorPoints[3], "v-"),  //4
               ], [
                  Component.Generics.makeConnector(this, "vcc+", "pin", connectorPoints[7], "v+"),  //8
                  Component.Generics.makeConnector(this, "out", "pin", connectorPoints[0], "2o"),   //1
                  Component.Generics.makeConnector(this, "in-", "pin", connectorPoints[1], "2i-"),  //2
                  Component.Generics.makeConnector(this, "in+", "pin", connectorPoints[2], "2i+"),  //3
                  Component.Generics.makeConnector(this, "vcc-", "pin", connectorPoints[3], "v-"),  //4
               ]];
            } else {
               this.connectorSets = [[
                  Component.Generics.makeConnector(this, "nc", "pin", connectorPoints[7], "nc"),        //8
                  Component.Generics.makeConnector(this, "vcc+", "pin", connectorPoints[6], "v+"),  //7
                  Component.Generics.makeConnector(this, "out", "pin", connectorPoints[5], "o"),    //6
                  Component.Generics.makeConnector(this, "offset n1", "pin", connectorPoints[4], "nc"), //5
                  Component.Generics.makeConnector(this, "offset n2", "pin", connectorPoints[0], "nc"),  //1
                  Component.Generics.makeConnector(this, "in-", "pin", connectorPoints[1], "i-"),   //2
                  Component.Generics.makeConnector(this, "in+", "pin", connectorPoints[2], "i+"),   //3
                  Component.Generics.makeConnector(this, "vcc-", "pin", connectorPoints[3], "v-"),  //4
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
               isDual: raw.state.isDual,
               joints: (vector.isVectorArray(raw.state.joints) && raw.state.joints.length === 2)
                  ? vector.standardise(raw.state.joints as AnyVector[])
                  : undefined
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
            Addins.Graphical.init(component);
            Addins.Draggable.init(component);
            Addins.Rotatable.init(component);
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