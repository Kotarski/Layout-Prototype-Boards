//Todo this is evaluated too often
namespace Circuit {
   const mappingsBuilder = (() => {

      const componentMaps = Utility.tuple(
         Component.wire.schematic,
         Component.resistor.schematic,
         Component.capacitor.schematic,
         Component.inductor.schematic,
         Component.diode.schematic,
         Component.opAmp.schematic,
         Component.power.schematic,
         Component.bipolar.schematic,
         Component.wire.layout,
         Component.resistor.layout,
         Component.capacitor.layout,
         Component.inductor.layout,
         Component.diode.layout,
         Component.opAmp.layout,
         Component.power.layout,
         Component.bipolar.layout,
         Component.stripboard.layout,
         Component.Breadboard.layoutSmall,
         Component.Breadboard.layoutLarge,
      );

      function getComponentMapSafe(data: string | Component.Instance) {
         const result = (typeof data === "string")
            ? componentMaps.find(map => map.savename === data)
            : componentMaps.find(map => map.instance === data["constructor"]);

         if (result !== undefined) {
            return result;
         } else {
            console.error("Component map not found with data %o", data);
            throw new Error("Component map does not exist!");
         }
      }

      function getComponentMap(data: string | Component.Instance) {
         return (typeof data === "string")
            ? componentMaps.find(map => map.savename === data)
            : componentMaps.find(map => map.instance === data["constructor"]);
      }

      //TODO use map(ts) to enforce correct values
      const connectorAcceptedTypes: { [key: string]: string[] } = {
         "pin": ["hole"],
         "hole": ["pin"],
         "brokenhole": [],
         "node": ["node"],
      }

      return {
         getComponentMap: getComponentMap,
         getComponentMapSafe: getComponentMapSafe,
         connectorAcceptedTypes: connectorAcceptedTypes,
      }
   });

   export let mappings: ReturnType<typeof mappingsBuilder>;

   export namespace Mappings {
      export function init() {
         mappings = mappingsBuilder();
      }
   }
}