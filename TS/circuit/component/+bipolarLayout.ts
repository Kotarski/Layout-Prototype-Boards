namespace Circuit.Component {
   export namespace BipolarLayout {
      export type Instance = Local.Instance;
      export namespace Types {
         export type properties = BipolarSchematic.Types.properties;

         export interface state extends Component.Types.state {
            joints: [Vector, Vector, Vector];
         }

         export interface loadFunction extends Component.Types.loadFunction {
            (raw: any): Instance;
         }
      }
   }

   namespace Local {
      import Types = BipolarLayout.Types;
      export class Instance extends Component.Instance implements Types.properties, Types.state {
         currentGain: number;
         type: "NPN" | "PNP"
         joints: [Vector, Vector, Vector];

         constructor(values: Types.properties & Types.state) {
            super(values);
            $(this.group.element).addClass("component " + this.name);
            this.joints = values.joints;
            this.type = values.type;
            this.currentGain = values.currentGain;
         }

         getProperties(): Types.properties {
            return Utility.deepCopy({
               name: this.name,
               currentGain: this.currentGain,
               type: this.type
            });
         }

         getState(): Types.state {
            return Utility.deepCopy({
               joints: this.joints,
               disabled: this.disabled
            });
         }

         draw() {
            //Style and add lead and highlight
            //(Prepend so handles appear on top)
            this.group.prepend(Svg.Element.Group.Bipolar.Layout.make(
               this.type,
               this.joints[0],
               this.joints[1],
               this.joints[2],
               "body"
            ));
         }

         /** Builds the components connectors */
         makeConnectors() {
            this.connectorSets = [[
               Component.Generics.makeConnector(this, "emitter", "pin", this.joints[0], "e"),
               Component.Generics.makeConnector(this, "collector", "pin", this.joints[1], "c"),
               Component.Generics.makeConnector(this, "base", "pin", this.joints[2], "b")
            ]];
         }

         transferFunction() { return [] };

      }

      export const defaulter: ValueCheck.Defaulter<Types.state & Types.properties> = {
         joints: ValueCheck.joints<[Vector, Vector, Vector]>(
            [{ x: 0, y: 0 }, { x: 20, y: -20 }, { x: 40, y: 0 }]
         ),
         disabled: ValueCheck.validate("boolean", false),
         name: ValueCheck.validate("string", "bipolar"),
         currentGain: ValueCheck.validate("number", 0),
         type: ValueCheck.validate<"NPN" | "PNP">(["NPN", "PNP"], "NPN")
      };

      export const loadInstance: Component.Types.loadFunction = (raw: any): Instance => {
         const name = (raw.name);
         const currentGain = (raw.currentGain);
         const type = (raw.type);
         const joints = (raw.joints);

         return makeInstance({ name, currentGain, type, joints }, true);
      }

      export const makeInstance = getMaker(Instance, defaulter,
         (component: Instance) => {
            $(component.group.element).addClass("component " + component.name);
            Addins.Graphical.init(component);
            Addins.Draggable.init(component);
            Addins.Selectable.init(component);
            Addins.Extendable.init(component);
            Addins.ConnectionHighlights.init(component);
         }
      );
   }

   export const BipolarLayout = {
      Instance: Local.Instance,
      makeInstance: Local.makeInstance,
      loadInstance: Local.loadInstance
   }
}


