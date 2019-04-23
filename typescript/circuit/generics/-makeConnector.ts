import Component, { Types } from "../+component";
import { Vector } from "../../-vector";

export default function makeConnector<T extends Types.connectorTypes>(
   component: Component,
   name: string,
   type: T,
   position: Vector,
   symbol?: string
): Types.connector<T> {

   return {
      name: name,
      symbol: symbol,
      type: type,
      component: component,
      point: position,
   }
}

