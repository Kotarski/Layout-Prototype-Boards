import tuple from "../utility/-tuple";
import Component from "../circuit/+component";
import WireMaps from "./component/_wire/-maps";
import ResistorMaps from "./component/resistor/-maps";
import CapacitorMaps from "./component/_capacitor/-maps";
import InductorMaps from "./component/_inductor/-maps";
import DiodeMaps from "./component/_diode/-maps";
import OpAmpMaps from "./component/_opAmp/-maps";
import PowerMaps from "./component/_power/-maps";
import BipolarMaps from "./component/_bipolar/-maps";
import BreadboardMaps from "./component/_breadboard/-maps";
import StripboardMaps from "./component/_stripboard/-maps";
import TrackMap from "./component/_track/-maps";

const mappingsBuilder = (() => {

   const componentMaps = tuple(
      WireMaps.schematic,
      WireMaps.layout,
      ResistorMaps.schematic,
      ResistorMaps.layout,
      CapacitorMaps.schematic,
      CapacitorMaps.layout,
      InductorMaps.schematic,
      InductorMaps.layout,
      DiodeMaps.schematic,
      DiodeMaps.layout,
      OpAmpMaps.schematic,
      OpAmpMaps.layout,
      PowerMaps.schematic,
      PowerMaps.layout,
      BipolarMaps.schematic,
      BipolarMaps.layout,
      BreadboardMaps.layoutLarge,
      BreadboardMaps.layoutSmall,
      StripboardMaps.layout,
      TrackMap,
   );

   function getComponentMapSafe(data: string | Component) {
      const result = (typeof data === "string")
         ? componentMaps.find(map => map.savename === data)
         : componentMaps.find(map => {
            return (data instanceof map.instance)
         });

      if (result !== undefined) {
         return result;
      } else {
            /*LOGSTART*/console.error("Component map not found with data %o", data);/*LOGEND*/
         throw new Error("Component map does not exist!");
      }
   }

   function getComponentMap(data: string | Component) {
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

const mappings = mappingsBuilder();

export default mappings;