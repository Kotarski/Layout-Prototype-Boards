import { Vector } from "../../++types";
// import { make as makeElement } from "../+element";
// import svg from "../-svg";
import * as React from "react";

// export default function make(path: string | (Vector[] | (Vector[])[]), classes: string = "") {
//    const pathString = (path instanceof Array) ? getLinePath(path) : path;
//    return <path d={pathString}></path>;
// }

interface PathProps {
   path: string | (Vector[] | (Vector[])[]);
   className: string;
}

export default function Path({ path, className }: PathProps) {
   const pathString = (path instanceof Array) ? getLinePath(path) : path;
   return <path d={pathString} className={className}></path>;
};

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
