//Todo this is evaluated too often
namespace Circuit {
   const mappingsBuilder = (() => {

      const schematicComponents = {
         "makeWire": Component.WireSchematic,
         "makeResistor": Component.ResistorSchematic,
         "makeCapacitor": Component.capacitor.schematic,
         "makeInductor": Component.inductor.schematic,
         "makeDiode": Component.diode.schematic,
         "makeOpAmp": Component.opAmp.schematic,
         "makePower": Component.power.schematic,
         "makeBipolar": Component.bipolar.schematic,
      };

      const layoutComponents = {
         "makeLayoutWire": Component.WireLayout,
         "makeLayoutResistor": Component.ResistorLayout,
         "makeLayoutCapacitor": Component.capacitor.layout,
         "makeLayoutInductor": Component.inductor.layout,
         "makeLayoutDiode": Component.diode.layout,
         "makeLayoutOpAmp": Component.opAmp.layout,
         "makeLayoutPower": Component.power.layout,
         "makeLayoutBipolar": Component.bipolar.layout,
         "makeLayoutStripboard": Component.Stripboard,
         "makeLayoutBreadboardSmall": Component.BreadboardSmall,
         "makeLayoutBreadboardLarge": Component.BreadboardLarge,
      };

      type componentLoaderName = keyof (typeof schematicComponents & typeof layoutComponents);
      type componentLoaderList = { [key: string]: { load: Component.Types.loadFunction } };
      const getComponentLoader = (name: componentLoaderName): Component.Types.loadFunction => {
         let schematicLoaders = schematicComponents as componentLoaderList;
         let layoutLoaders = layoutComponents as componentLoaderList;
         if (schematicLoaders[name]) {
            return schematicLoaders[name].load;
         } else if (layoutLoaders[name]) {
            return layoutLoaders[name].load;
         }

         throw new Error("Component loader missing!")
      };

      const sortComponentByName = (name: componentLoaderName): ("schematic" | "layout" | "none") => {
         const schematicKeys = Object.keys(schematicComponents);
         const layoutKeys = Object.keys(layoutComponents);
         if (schematicKeys.includes(name)) {
            return "schematic";
         } else if (layoutKeys.includes(name)) {
            return "layout";
         } else {
            return "none";
         }
      };

      type componentInstanceList = { [key: string]: { instance: typeof Component.Instance } };
      function getSaveName<C extends Component.Instance>(component: C): string {
         let loaders = Object.assign({}, schematicComponents, layoutComponents) as componentInstanceList;
         let constructor = component["constructor"] as typeof Component.Instance

         for (let key in loaders) {
            if (loaders.hasOwnProperty(key) && (constructor === loaders[key].instance)) {
               return key;
            }
         }

         throw new Error("Component savename missing!")
      }



      const schematicToLayoutMap: {
         set: <
            C extends Component.Instance,
            P extends ReturnType<C["getProperties"]>,
            S extends ReturnType<C["getState"]>,
            V extends (v: P) => Component.Instance>(key: { new(values: P & S): C }, value: V) => typeof schematicToLayoutMap;
         get: <
            C extends Component.Instance,
            P extends ReturnType<C["getProperties"]>,
            S extends ReturnType<C["getState"]>,
            V extends (v: P) => Component.Instance>(key: { new(values: P & S): C }) => V;
      } = new Map() as any; //TODO
      schematicToLayoutMap
         .set(Component.ResistorSchematic.instance, Component.ResistorLayout.make)
         .set(Component.capacitor.schematic.instance, Component.capacitor.layout.make)
         .set(Component.inductor.schematic.instance, Component.inductor.layout.make)
         .set(Component.diode.schematic.instance, Component.diode.layout.make)
         .set(Component.opAmp.schematic.instance, Component.opAmp.layout.make)
         .set(Component.power.schematic.instance, Component.power.layout.make)
         .set(Component.bipolar.schematic.instance, Component.bipolar.layout.make);

      function getLayoutInstanceFromSchematic<
         C extends Component.Instance,
         P extends ReturnType<C["getProperties"]>,
         S extends ReturnType<C["getState"]>>(schematic: C): Component.Instance {
         let constructor = schematic["constructor"] as { new(values: P & S): C };
         let properties = schematic.getProperties() as P;
         return schematicToLayoutMap.get(constructor)(properties);
      }


      function isCorresponder(component: Component.Instance): boolean {
         return ["resistor", "capacitor", "power", "opAmp", "diode", "inductor", "bipolar"].includes(component.name)
      }

      function isUnique(component: Component.Instance): boolean {
         return ["power"].includes(component.name)
      }

      function isBoard(component: Component.Instance): boolean {
         return ["stripboard", "breadboardsmall", "breadboardlarge"].includes(component.name)
      }

      //TODO use map(ts) to enforce correct values
      const connectorAcceptedTypes: { [key: string]: string[] } = {
         "pin": ["hole"],
         "hole": ["pin"],
         "brokenhole": [],
         "node": ["node"],
      }

      return {
         getComponentLoader: getComponentLoader,
         sortComponentByName: sortComponentByName,
         getLayoutInstanceFromSchematic: getLayoutInstanceFromSchematic,
         isUnique: isUnique,
         getSaveName: getSaveName,
         connectorAcceptedTypes: connectorAcceptedTypes,
         isCorresponder: isCorresponder,
         isBoard: isBoard
      }
   });

   export let mappings: ReturnType<typeof mappingsBuilder>;

   export namespace Mappings {
      export function init() {
         mappings = mappingsBuilder();
      }
   }
}