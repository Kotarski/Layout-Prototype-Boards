namespace Svg.Element.Path {
   export type type = ReturnType<typeof make>;
   export function make(path: string | (Vector[] | (Vector[])[]), classes: string = "") {
      const element: SVGPathElement = Element.make("path", classes);
      let pathString = (path instanceof Array) ? getLinePath(path) : path;
      element.setAttribute('d', pathString);
      return svg(element);
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
}