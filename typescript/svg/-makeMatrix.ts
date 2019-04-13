import { makeElement } from "./+element";
export default function makeMatrix(): SVGMatrix {
   return makeElement<SVGSVGElement>("svg").createSVGMatrix();
}

