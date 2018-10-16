import Component, { Types } from "../+component";
import { Vector } from "../../-vector";

export default function makeConnector<T extends Types.connectorTypes>(
   component: Component,
   name: string,
   type: T,
   position: Vector,
   symbol?: string
): Types.connector & { type: T } {

   let connector = {
      name: name,
      symbol: symbol,
      type: type,
      component: component,
      point: position,
   }

   return connector;
}

