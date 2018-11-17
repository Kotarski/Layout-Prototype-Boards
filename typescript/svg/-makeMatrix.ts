import { make } from "./+element";
export default function makeMatrix(): SVGMatrix {
   return make<SVGSVGElement>("svg").createSVGMatrix();
}

