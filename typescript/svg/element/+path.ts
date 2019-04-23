import { Vector } from "../../++types";
import { makeElement as makeElement } from "../+element";
import svg from "../-svg";
import vector from "../../-vector";

export type path = ReturnType<typeof makePath>;
export function makePath(path: string | (Vector[] | (Vector[])[]), classes: string = "") {
   const element: SVGPathElement = makeElement("path", classes);
   let pathString = (path instanceof Array) ? getLinePath(path) : path;
   element.setAttribute('d', pathString);
   return svg(element);
}


function getPathWrapper<T extends SVGPathElement>(element: T) {
   return <Args extends any[]>(wrapped: (...args: Args) => string) => {
      return (...args: Args) => {
         const currentPath = element.getAttribute('d') || "";
         const pathAddition = wrapped(...args)
         element.setAttribute("d", currentPath + pathAddition);
         return svg(element);
      }
   }
}

function getLinePath(jointSet: (Vector[] | (Vector[])[])) {
   if (jointSet.length > 0 && jointSet[0] instanceof Array) {
      let jointArrays = jointSet as Vector[][];
      return jointArrays.map(getSingleLinePath).join()
   } else {
      let joints = jointSet as Vector[];
      return getSingleLinePath(joints);
   }
}

function getSingleLinePath(joints: Vector[]) {
   if (joints.length < 1) {
      return "";
   } else {
      return "M" + joints[0].x + " " + joints[0].y
         + joints.map(joint => "L" + joint.x + " " + joint.y).join();
   }
}

export const getPathFunctions = <T extends SVGPathElement>(element: T) => ({
   /****************************************************************************
    * Lines
   ****************************************************************************/
   segments: getPathWrapper(element)(getLinePath),
   M: getPathWrapper(element)(
      ({ x, y }: Vector) => `M ${x},${y}`
   ),
   m: getPathWrapper(element)(
      ({ x, y }: Vector) => `m ${x},${y}`
   ),
   L: getPathWrapper(element)(
      ({ x, y }: Vector) => `L ${x},${y}`
   ),
   l: getPathWrapper(element)(
      ({ x, y }: Vector) => `l ${x},${y}`
   ),
   H: getPathWrapper(element)(
      (x: number) => `H ${x}`
   ),
   h: getPathWrapper(element)(
      (x: number) => `M ${x}`
   ),
   V: getPathWrapper(element)(
      (y: number) => `V ${y}`
   ),
   v: getPathWrapper(element)(
      (y: number) => `v ${y}`
   ),
   Z: getPathWrapper(element)(
      () => `Z`
   ),
   /****************************************************************************
    * Curves
   ****************************************************************************/
   C: getPathWrapper(element)(
      ({ c1, c2, e }: Record<"c1" | "c2" | "e", Vector>) =>
         `C ${c1.x} ${c1.y} ${c2.x} ${c2.y} ${e.x} ${e.y}`
   ),
   c: getPathWrapper(element)(
      ({ c1, c2, e }: Record<"c1" | "c2" | "e", Vector>) =>
         `c ${c1.x} ${c1.y} ${c2.x} ${c2.y} ${e.x} ${e.y}`
   ),
   Q: getPathWrapper(element)(
      ({ c, e }: Record<"c" | "e", Vector>) =>
         `Q ${c.x} ${c.y} ${e.x} ${e.y}`
   ),
   q: getPathWrapper(element)(
      ({ c, e }: Record<"c" | "e", Vector>) =>
         `q ${c.x} ${c.y} ${e.x} ${e.y}`
   ),
   A: getPathWrapper(element)(
      ({ radii, rotation = 0, arc, sweep, end }: { radii: Vector | number, end: Vector | number, rotation?: number, arc: number, sweep: number }) => [
         `A `
         , `${vector(radii).x}`
         , `${vector(radii).y}`
         , `${rotation}`
         , `${arc}`
         , `${sweep}`
         , `${vector(end).x}`
         , `${vector(end).y}`
      ].join(" ")
   ),
   a: getPathWrapper(element)(
      ({ radii, rotation = 0, arc, sweep, end }: {
         radii: Vector | number
         , end: Vector | number
         , rotation?: number
         , arc: number
         , sweep: number
      }) => [`a`
         , `${vector(radii).x}`
         , `${vector(radii).y}`
         , `${rotation}`
         , `${arc}`
         , `${sweep}`
         , `${vector(end).x}`
         , `${vector(end).y}`
      ].join(" ")
   )
})

vector(4)

